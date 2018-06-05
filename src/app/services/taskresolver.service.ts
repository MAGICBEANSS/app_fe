import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class TaskResolver {
    constructor(private http: Http) {

    }
    getPendingTask(): Observable<any> {
return this.http.get('../../assets/json/pending_task.json');

    }
    getMenu(): Observable<any> {
        return this.http.get('menudata.json')
        ;
            }
}
