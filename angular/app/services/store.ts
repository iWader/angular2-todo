import { Injectable } from "@angular/core";

export class Todo {

    completed_at: Boolean;

    protected _title: String;

    constructor(title:String) {
        this.completed_at = false;
        this.title = title;
    }

    get title() {
        return this._title;
    }

    set title(value: String) {
        this._title = value;
    }
}

@Injectable()
export class TodoStore {

    todos: Todo[];

    constructor() {

        this.todos = [];

        for(var i = 1; i < 5; i++) {
            this.todos.push(new Todo('This is todo ' + i));
        }

    }

    add(title: String) {
        this.todos.push(new Todo(title));
    }

    remove(todo: Todo) {
        this.todos.splice(this.todos.indexOf(todo), 1)
    }

}