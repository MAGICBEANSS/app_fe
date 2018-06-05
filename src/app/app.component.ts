import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { SwUpdate} from '@angular/service-worker';

import {Observable} from 'rxjs/Observable';

import {SwPush} from '@angular/service-worker';
import {NewsletterService} from './messaging.service';
import { LoginstatusService } from './loginstatus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  sub: PushSubscription;

  readonly VAPID_PUBLIC_KEY = 'BKYEevgdyG0q71I4a45jYYrSnkLX_p-NSQuGLnmiDDhGz8jGTXyILmbBcpqR0USDnskuJN_kikqTgLxQGC94Mfs';

  constructor(private _rr: Router,
    private _lls: LoginstatusService,
    private swPush: SwPush,
    private newsletterService: NewsletterService,
    private swUpdate: SwUpdate
  ) {
    localStorage.removeItem('loginkey');
 //     this._rr.navigate(['dashboard']);
 this._lls.setLoggedIn(false);
  }

 ngOnInit() {
    localStorage.removeItem('loginkey');
  this.subscribeToNotifications();
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


sendNewsletter() {


    console.log('Sending Newsletter to all Subscribers ...');

    this.newsletterService.send().subscribe();
}
}
