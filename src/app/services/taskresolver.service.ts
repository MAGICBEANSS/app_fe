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
       // this.getInnerMenu();
 // return this.http.get('../../assets/json/menudata.json');
 return this.http.get('assets/json/menudata.json');
  //    return this.http.get('https://antrorse.org/pp/menudata.json');
    //  return this.http.get('http://111.93.191.82:81/LMSRetail/menudata.json');
        
            }

    getInnerMenu(): Observable<any> {
        //    return this.http.get('../../assets/json/localmenu.json');
            return this.http.get('assets/json/localmenu.json');
     //    return this.http.get('https://antrorse.org/pp/menudata.json');
     //  return this.http.get('http://111.93.191.82:81/LMSRetail/menudata.json');
                           }


    getGridList(): Observable<any> {
        return this.http.get('assets/json/gridlist.json');
    }
    getTableList(): Observable<any> {
      // return this.http.get('../../assets/json/tablelist.json');
      return this.http.get('assets/json/tablelist.json');
    //  return this.http.get('https://jsonplaceholder.typicode.com/users');
    }

   getAppDetails(): Observable<any> {
                return this.http.get('manifest.json');
             //   return this.http.get('https://www.antrorse.org/pp/manifest.json');
              //  return this.http.get('http://111.93.191.82:81/LMSRetail/menudata.json');
                 
                     }
}
