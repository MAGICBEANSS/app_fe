import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { SwUpdate} from '@angular/service-worker';

import {Observable} from 'rxjs/Observable';
import {OnlineAvailableService} from './services/online-available.service';
import {SwPush} from '@angular/service-worker';
import {NewsletterService} from './messaging.service';
import { LoginstatusService } from './loginstatus.service';
import {  OnDestroy , ViewChild} from '@angular/core';
import { SettingsService } from './services/settings.service';
import {AfterViewInit} from '@angular/core';
import { MatSidenav } from '@angular/material';
// import { ROUTES } from './sidebar-routes.config';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { TaskResolver } from './services/taskresolver.service';
import {AppDataService} from './app-data.service';
import { AuthService } from "angular2-social-login";
import { SocialUser } from './SocialUser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  header = "Dashboard"
  title = 'app works!';
  sub: PushSubscription;
  mobileQuery: MediaQueryList;
  menuList: Array<any>;
  localmenu: Array<any>;
  @ViewChild('side') public sideNav: MatSidenav;
  private _mobileQueryListener: () => void;
  public id: number;
  public loggedIn = false;
  public backgroundColor: string;
  public boxheight;
  public isOnline = true;
  public primary = 'red'; 
public headercolor:string;
  readonly VAPID_PUBLIC_KEY = 'BKYEevgdyG0q71I4a45jYYrSnkLX_p-NSQuGLnmiDDhGz8jGTXyILmbBcpqR0USDnskuJN_kikqTgLxQGC94Mfs';

  constructor(
    private _ats: AuthService,
    private _apd: AppDataService,
    private _ols: OnlineAvailableService,
    private _rr: Router,
    private _lls: LoginstatusService,
    private swPush: SwPush,
    private newsletterService: NewsletterService,
    private swUpdate: SwUpdate,
    private _trs: TaskResolver, 
    changeDetectorRef: ChangeDetectorRef, 
    private media: MediaMatcher,
    public settingService: SettingsService ,
  ) {

console.log('kdfjdsklf');
console.log(this._apd.user);
// root.component.copied
this._ols.isConnected$.subscribe((value) => {
  if(value == false)
      {
       this.isOnline = false;
      }
      else
      {
        this.isOnline = true;
      }
});
const userdata : SocialUser = JSON.parse(localStorage.getItem('userdata_pwa_app'));
// this.backgroundColor = userdata.headercolor;
this.header = localStorage.getItem('myappfname');
 this._apd.userdata.subscribe((data) => {
  console.log('userdata');
  console.log(data);
 this._lls.loggedIn.subscribe((status ) => {
   if(status)
   {
     this._apd.userdata.subscribe((adata) => {
       console.log(adata);
       this.header = adata.firstName;
       this.header = localStorage.getItem('myappfname');
 //      this._apd.user = adata;

     });
   }
 });
  
  
    }); 
  

this._lls.loggedIn.subscribe((res) => {
    console.log('res -< ');
    console.log(res);
    this.loggedIn = res;
    if (this.loggedIn) {
    this.boxheight = 'height90';
    } else {
      this.boxheight = 'height100';
    }
        });
        this.id = settingService.getSidebarImageIndex() + 1;
   //     this.backgroundColor = settingService.getSidebarColor();
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

// root.component copied eends
  //  localStorage.removeItem('loginkey');
 //     this._rr.navigate(['dashboard']);
 if(localStorage.getItem('loginkey')!=null)
 {
 const loginkeyvalue = localStorage.getItem('loginkey');  
 this._lls.setLoggedIn(true,loginkeyvalue);
 }
 else
 this._lls.setLoggedIn(false);
  }

 ngOnInit() {
   // localStorage.removeItem('loginkey');
  this.subscribeToNotifications();

  // root-component-copied

  this.settingService.sidebarImageIndexUpdate.subscribe((id: number) => {
    this.id = id + 1;
  });
  this.settingService.sidebarColorUpdate.subscribe((color: string) => {
    this.backgroundColor = color;
  });
  this._trs.getMenu().subscribe(
    (data) => {
      data = data.json();
      console.log(data);
      this.menuList = data[0].data;
      console.log('menuitems ');
      console.log(this.menuList);
  //    this.pendingtask = data;
    //   this.countpendingtasks = this.pendingtask.length;
    }
  );
  this._trs.getInnerMenu().subscribe(
    (data) => {
      data = data.json();
      console.log(data);
      this.localmenu = data;
      console.log('localmenu ');
      console.log(this.localmenu);
  //    this.pendingtask = data;
    //   this.countpendingtasks = this.pendingtask.length;
    }
  );


  // root-component -copied ends
 }
  subscribeToNotifications() {

    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {

        this.sub = sub;


        console.log('Notification Subscription: ', sub);
        const result = sub['endpoint'].split('/')
        console.log('res ');
        console.log(result);

        const subend = result[result.length - 1];
        console.log('subobj');
        console.log(subend);
    //    this.newsletterService.addPushSubscriber(sub).subscribe(
            this.newsletterService.addPushSubscriber(sub).subscribe(
            (res) => {
                alert(res);
                console.log(res);
                console.log('Sent push subscription object to server.')
            },
            err =>  console.log('Could not send subscription object to server, reason: ', err)
        );

    })
    .catch(err => console.error('Could not subscribe to notifications', err));

}



ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.settingService.sidebarImageIndexUpdate.unsubscribe();
    this.settingService.sidebarColorUpdate.unsubscribe();
  }
  routeto() {
  //  this.sideNav.close();
    this._rr.navigate(['loader'], {queryParams : {from: 'notother'}});
  }
  gotoDasboard(path) {
    if(path=='dashboard')
    this._rr.navigate(['dashboard/']);
    else if(path == 'grid')
    this._rr.navigate(['grid/']);
    else if(path == 'table')
    this._rr.navigate(['table']);
  }
  routesto(menudata: any,type) {
    if(type == 'external')
{
    console.log('ddddd');
    console.log(menudata);
  //  this.sideNav.close();
    this._rr.navigate(['loader'], {queryParams : {frameurl: menudata.url}});
}
if(type == 'internal')
{
    console.log('ddddd');
    console.log(menudata);
  //  this.sideNav.close();
    this._rr.navigate([menudata['url']]);
}
  }
 /*  routesdiff() {
    this._rr.navigate(['loader'], {queryParams : {from: 'other'}});
  } */
  logout() {

    localStorage.removeItem('myappfname');
    localStorage.removeItem('userdata_pwa_app');
    this._ats.logout().subscribe(
      (data)=>{
        console.log(data);
        this._apd.user=null;
        console.log('logout');
      }
    ) 
   
   // this._ats.signOut();
    this._lls.setLoggedIn(false);
    this._rr.navigate(['']);
  }


sendNewsletter() {


    console.log('Sending Newsletter to all Subscribers ...');

    this.newsletterService.send().subscribe();
}
}
