import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { SwUpdate} from '@angular/service-worker';

import {Observable} from 'rxjs/Observable';

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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app works!';
  sub: PushSubscription;
  mobileQuery: MediaQueryList;
  menuList: Array<any>;
  @ViewChild('side') public sideNav: MatSidenav;
  private _mobileQueryListener: () => void;
  public id: number;
  public loggedIn = false;
  public backgroundColor: string;
  public boxheight;

  readonly VAPID_PUBLIC_KEY = 'BKYEevgdyG0q71I4a45jYYrSnkLX_p-NSQuGLnmiDDhGz8jGTXyILmbBcpqR0USDnskuJN_kikqTgLxQGC94Mfs';

  constructor(private _rr: Router,
    private _lls: LoginstatusService,
    private swPush: SwPush,
    private newsletterService: NewsletterService,
    private swUpdate: SwUpdate,
    private _trs: TaskResolver, 
    changeDetectorRef: ChangeDetectorRef, 
    private media: MediaMatcher,
    public settingService: SettingsService ,
 //   private _loginstatusservice: LoginstatusService,
  //  private _route: Router
  ) {

// root.component.copied

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
        this.backgroundColor = settingService.getSidebarColor();
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

// root.component copied ends
  //  localStorage.removeItem('loginkey');
 //     this._rr.navigate(['dashboard']);
 if(localStorage.getItem('loginkey')!=null)
 this._lls.setLoggedIn(true);
 else
 this._lls.setLoggedIn(false);
  }

 ngOnInit() {
    localStorage.removeItem('loginkey');
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
    this._rr.navigate(['dashboard/loader'], {queryParams : {from: 'notother'}});
  }
  routesto(menudata: any) {
    console.log('ddddd');
    console.log(menudata);
  //  this.sideNav.close();
    this._rr.navigate(['loader'], {queryParams : {frameurl: menudata.url}});
  }
  routesdiff() {
    this._rr.navigate(['loader'], {queryParams : {from: 'other'}});
  }
  logout() {
    this._lls.setLoggedIn(false);
  }


sendNewsletter() {


    console.log('Sending Newsletter to all Subscribers ...');

    this.newsletterService.send().subscribe();
}
}
