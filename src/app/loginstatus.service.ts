import { Injectable } from '@angular/core';
// import {Subject} from 'rxjs/Subject';
 import { Subject, BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class LoginstatusService {
isLoggedIn = false;
 
public loggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {
    if (localStorage.getItem('loginkey') !== null ) {
        this.isLoggedIn = true;
    }
   }

    setLoggedIn(status) {
      if (status) {
        this.loggedIn.next(status);
      localStorage.setItem('loginkey', 'someloginkey');
      } else {
        this.loggedIn.next(status);
        localStorage.removeItem('loginkey');
      }
      
    }
}


/*
_________________

import { Injectable } from '@angular/core';
// import {subject from 'rxjs/subject'

@Injectable()
export class LoginstatusService {
isLoggedIn = false;

// sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();
  constructor() {
    if (localStorage.getItem('loginkey') !== null ) {
        this.isLoggedIn = true;
    }
   }


}
 */
