import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject} from 'rxjs/Rx';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from './SocialUser';
@Injectable()
export class AppDataService {
  user: SocialUser = new SocialUser(); 
public userdata: Subject<SocialUser> = new ReplaySubject<SocialUser>(1);
  constructor() { 

  }

  setUserData(data: SocialUser) {
  localStorage.setItem('userdata_pwa_app',JSON.stringify(data));
  this.userdata.next(data);
    if(this.user) {
    this.user = data;
    }
  }
}
