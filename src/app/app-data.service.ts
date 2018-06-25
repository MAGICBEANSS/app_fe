import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject} from 'rxjs/Rx';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
@Injectable()
export class AppDataService {
  user: SocialUser = new SocialUser(); 

// public userdetails : SocialUser
public userdata: Subject<SocialUser> = new ReplaySubject<SocialUser>(1);
  constructor() { 
 /*    this.user.firstName = ''; 
    this.user.authToken = '';  */
  }

    setUserData(data: SocialUser) {
  console.log(data, 'method');
    this.userdata.next(data);
    if(this.user) {
  //  this.user.firstName = data.name;
  //  this.user.email = data.email;
  //  this.user.authToken = data.authToken;
    this.user = data;
    }
  }
}


 class UserData {
  constructor() {
    this.username ='';
    this.firstname ='';
    this.lastname ='';
    this.navbarcolor ='';
    this.sidebarcolor ='';
    this.appid = [];
  }
  username: string;
  firstname: string;
  lastname: string;
  navbarcolor: string;
  sidebarcolor: string;
  appid: string[]; 
} 

// export declare class SocialUser {
//   provider: string;
//   id: string;
//   email: string;
//   name: string;
//   photoUrl: string;
//   firstName: string;
//   lastName: string;
//   authToken: string;
//   idToken: string;
// }
