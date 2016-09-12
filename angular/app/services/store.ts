import { Injectable } from '@angular/core'
import {Http, Headers, Response} from '@angular/http'
import { Config } from '../app.constants'
import {Observable} from "rxjs/Rx";

@Injectable()
export class TodoRestService {

    protected endpoint: string
    protected headers: Headers

    constructor(private _http: Http, private _config: Config) {

        this.endpoint = _config.URL + 'todo'

        this.headers = new Headers()
        this.headers.append('Content-Type', 'application/json');

    }

    all(): Observable<Todo[]> {
        return this._http.get(this.endpoint)
            .map((response: Response) => <Todo[]>response.json().data)
    }

}

export class Todo {

    completed_at: Boolean;

    protected _title: string;

    constructor(title: string) {
        this.completed_at = false;
        this.title = title;
    }

    get title() {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }
}

@Injectable()
export class TodoStore {

    todos: Todo[];

    constructor(private _api: TodoRestService) {
        this.todos = [];
    }

    load() {
        this._api.all()
            .subscribe((data: Todo[]) => this.todos = data)
    }

    add(title: string) {
        this.todos.push(new Todo(title));
    }

    remove(todo: Todo) {
        this.todos.splice(this.todos.indexOf(todo), 1)
    }

}