import { Component, OnInit ,NgZone } from '@angular/core';
import { Router, Route} from '@angular/router';
import { Http } from '@angular/http';
import { LoginstatusService } from '../../loginstatus.service';
import { TaskResolver } from '../../services/taskresolver.service';
import { AppDataService  }  from '../../app-data.service';
// import { AuthService } from 'angularx-social-login';
import { AuthService } from "angular2-social-login";
 import { SocialUser } from '../../SocialUser';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sub: any;
  isLoggedIn = false;
  logginIn = false;
  appName: String;
  email = 'peter@klaven';
  password = 'cityslicka';
  user: SocialUser;
  constructor(
    private _ngz: NgZone,
    private _auth: AuthService,
    private _router: Router, private http: Http,
    private _loginstatusservice: LoginstatusService,
    private _trs: TaskResolver,
    private _appData: AppDataService
  ) {
    console.log('user');
 /* this.authService.authState.subscribe((user) => {
   console.log(user);
   console.log(this._appData.user);
   if(this._appData.user==null)
   {


   }
   else 
   {
     this.logginIn = true;
  this._appData.user = user;
   }
  
}); */
 //   this.isLoggedIn = this._loginstatusservice.isLoggedIn;
  }

  ngOnInit() {
  }
  setuserData(resdata) {
    if(resdata['token'] !== '')
    {
      this._appData.setUserData(resdata);  
      this._router.navigate(['dashboard']);
    }
  }
  signInWithGoogle(): void {
  //  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  let provider='google';
  //   var self = this;
  const socialdata = new SocialUser();
     this.sub = this._auth.login(provider).subscribe(
       (data) => {
                   console.log(data);
                   
                   socialdata.authToken=data['token'];
                   socialdata.firstName=data['name'].split(' ')[0];
                   socialdata.lastName =data['name'].split(' ')[1];
                   localStorage.setItem('myappfname',socialdata.firstName);
                   socialdata.id=data['uid'];
                   socialdata.provider=data['provider'];
                   socialdata.email=data['email'];
                   socialdata.photoUrl = data['image'];
 
                   this._loginstatusservice.setLoggedIn(true,data['token']);
 
             //      localStorage.setItem('loginkey',data['token']);
               
                   this._appData.setUserData(socialdata);
                   
                    this._ngz.run(() => {
                      localStorage.setItem('myappfname',socialdata.firstName);
                     this._router.navigate(['dashboard']);
                   }); 
                  
                 
  
         
                 }
     )
  }
  signInWithFB(): void {
    let provider='facebook';
 //   var self = this;
 const socialdata = new SocialUser();
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
                  console.log(data);
                  socialdata.authToken=data['token'];
                  socialdata.firstName=data['name'].split(' ')[0];
                  socialdata.lastName =data['name'].split(' ')[1];
                  socialdata.id=data['uid'];
                  socialdata.provider=data['provider'];
                  socialdata.email=data['email'];
                  socialdata.photoUrl = data['image'];

                  this._loginstatusservice.setLoggedIn(true,data['token']);

            //      localStorage.setItem('loginkey',data['token']);
                localStorage.setItem('myappfname',socialdata.firstName);
                  this._appData.setUserData(socialdata);
                  
                   this._ngz.run(() => {
                    localStorage.setItem('myappfname',socialdata.firstName);
                    this._router.navigate(['dashboard']);
                  }); 
                 
                

        
                }
    )

  }
  ngOnDestroy(){
  //  this.sub.unsubscribe();
  }

  loginBtn() {
    const logindata = {'email':this.email,'password':this.password};
    const loginapiservice = 'https://reqres.in/api/login' ;
    this.http.post(loginapiservice,logindata).subscribe(
      (res) => {
        console.log('loginresponse');
        console.log(res);
        
        console.log(res.json());
        const resdata= res.json();
        this.setuserData(resdata);
        if(resdata['token'] !== '')
        {
          this._loginstatusservice.setLoggedIn(true,resdata['token']);
          this._router.navigate(['dashboard']);
        }
        
      }
    );

    this._router.navigate(['dashboard']);
    const body = new FormData();
body.append('user_token', 'anyusertoken');
// localStorage.setItem('loginkey', 'loginresponseafterpost');
    this.http.post(' http://localhost:9000/api/notifications', body).subscribe(
      (res) => {
        console.log(res);
      });
  }
}
