import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component'
import { TodoStore, TodoRestService } from './services/store';
import { Config } from './app.constants';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        TodoStore,
        TodoRestService,
        Config
    ]
})

export class AppModule { }