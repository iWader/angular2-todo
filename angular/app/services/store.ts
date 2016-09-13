import { Injectable } from '@angular/core'
import {Http, Headers, Response} from '@angular/http'
import { Config } from '../app.constants'
import { Observable } from 'rxjs/Rx';

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
        return this._http.post(this.endpoint, JSON.stringify(todo), { headers: this.headers })
            .map((response: Response) => <Todo>response.json().data)
    }

    update(todo: Todo): Observable<Todo> {
        let json = JSON.stringify({title: todo.title, completed: todo.completed })

        return this._http.put(this.endpoint + '/' + todo.id, json, { headers: this.headers })
            .map((response: Response) => <Todo>response.json().data)
    }

    destroy(todo: Todo): Observable<Response> {
        return this._http.delete(this.endpoint + '/' + todo.id)
    }
}

export class Todo {

    protected _id: number
    protected _saving: boolean = false
    protected _title: string
    public completed: boolean = false

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

    toJSON() {
        return {
            id: this._id,
            title: this._title,
            completed: this.completed
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
        let todo = new Todo(title)

        todo.saving = true

        this.todos.push(todo)

        this._api.add(todo)
            .subscribe((data: Todo) => {
                todo.id = data.id
                todo.title = data.title
                todo.completed = data.completed

                todo.saving = false
            })
    }

    update(todo: Todo) {
        todo.saving = true

        this._api.update(todo)
            .subscribe((data: Todo) => {
                todo.id = data.id
                todo.title = data.title
                todo.completed = data.completed

                todo.saving = false
            })
    }

    remove(todo: Todo) {
        var _self = this

        todo.saving = true

        this._api.destroy(todo)
            .subscribe(() => {
                _self.todos.splice(this.todos.indexOf(todo), 1)
            })
    }

}