

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';



@Injectable()
export class NewsletterService {

    constructor(private http: HttpClient) {

    }

    addPushSubscriber(sub: any) {
  //      return this.http.post('/api/notifications', sub);
 const user_token = sub;
 const user_toke_json = {
     'user_token': user_token
 }
 const body = new FormData();
body.append('user_token', user_token);
console.log(body);
console.log('sending user_token => ' + user_token + ' to https://antrorse.org/push/addtoken.php');
 //  return this.http.post(' http://localhost:9000/api/notifications', sub);
  // return this.http.post('https://antrorse.org/push/addtoken.php', body );
  return this.http.post('https://ec2-54-218-242-127.us-west-2.compute.amazonaws.com/api/lessons', sub);
    }

    send() {
        return this.http.post('https://ec2-54-218-242-127.us-west-2.compute.amazonaws.com/api/newsletter', null);
    }

}


