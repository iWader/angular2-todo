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

    add(todo: Todo): Observable<Todo> {
        todo.saving = true

        return this._http.post(this.endpoint, JSON.stringify(todo), { headers: this.headers })
            .map((response: Response) => {
                todo.hydrate(response.json().data)

                todo.saving = false

                return todo
            })
    }
}

export class Todo {

    protected _id: number
    protected _saving: boolean = false
    protected _title: string
    public completed_at: Date

    constructor(title: string) {
        this.title = title
    }

    get id(): number {
        return this._id
    }

    set id(value:number) {
        this._id = value
    }

    get title(): string {
        return this._title
    }

    set title(value: string) {
        this._title = value
    }

    get saving(): boolean {
        return this._saving
    }

    set saving(value: boolean) {
        this._saving = value
    }

    hydrate(data: any) {
        this.id = data.id
        this.title = data.title
        this.completed_at = data.completed_at
    }

    toJSON(): Object {
        return {
            title: this._title,
            completed_at: this.completed_at instanceof Date ? this.completed_at.toISOString() : null,
        }
    }
}

@Injectable()
export class TodoStore {

    todos: Todo[];

    constructor(private _api: TodoRestService) {
        this.todos = []
    }

    load() {
        this._api.all()
            .subscribe((data: Todo[]) => this.todos = data)
    }

    add(title: string) {
        let todo = new Todo(title);

        this.todos.push(todo)

        this._api.add(todo)
            .subscribe()
    }

    remove(todo: Todo) {
        this.todos.splice(this.todos.indexOf(todo), 1)
    }

}