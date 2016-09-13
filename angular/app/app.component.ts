import { Component, OnInit } from '@angular/core'
import { TodoStore, Todo } from './services/store'

@Component({
    selector: 'todo-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    store: TodoStore
    newTodo: ''

    constructor(store: TodoStore) {
        this.store = store
    }

    ngOnInit() {
        this.store.load()
    }

    toggleComplete(todo: Todo) {
        todo.completed_at = todo.completed_at instanceof Date ? undefined : new Date()
    }

    createTodo() {
        this.store.add(this.newTodo)

        this.newTodo = ''
    }

    deleteTodo(todo: Todo) {
        this.store.remove(todo)
    }
}