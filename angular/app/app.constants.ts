import { Injectable } from '@angular/core'

@Injectable()
export class Config {
    Server: string = 'http://127.0.0.1:8080/'
    BaseUri: string = 'api/'
    URL: String = this.Server + this.BaseUri
}