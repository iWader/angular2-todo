import { Component } from '@angular/core'
import { TodoStore } from "./services/store";

@Component({
    selector: 'todo-app',
    templateUrl: './app.component.html'
})

export class AppComponent {
    store: TodoStore;

    constructor(store: TodoStore) {
        this.store = store;
    }
}