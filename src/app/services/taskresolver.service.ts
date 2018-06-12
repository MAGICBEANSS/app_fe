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
   //      return this.http.get('menudata.json');
      return this.http.get('http://111.93.191.82:81/LMSRetail/menudata.json');
        
            }

            getAppDetails(): Observable<any> {
                return this.http.get('manifest.json');
             //   return this.http.get('https://www.antrorse.org/pp/manifest.json');
              //  return this.http.get('http://111.93.191.82:81/LMSRetail/menudata.json');
                 
                     }
}
