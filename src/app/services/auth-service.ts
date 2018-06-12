import { Injectable } from '@angular/core';
import {HttpModule , Http } from '@angular/http';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  token ;
  constructor(private _http: Http, private _r: Router) {}

  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('loginkey');
    console.log('isAuthenticated ');
    console.log(token);
    if (token != null) {
        return true;
    }
    return false;
  }

  login(data: any) {
    console.log(data);
    const details: Object = {'email' : '', 'password' : ''};
    details['\'email\''] = data['userName'];
    details['\'password\''] = data['password'];
    this._http.post('https://reqres.in/api/login', {
      'email': 'peter@klaven',
      'password': 'cityslicka'
  }
  )/* . map(
    (res) => {res = res.json(); console.log('adfssdfs'); console.log(res); }
  ). */
  .subscribe(
    (datas) => {
      datas = datas.json();
      console.log('fsdjfs');
      console.log(datas);
      if (datas !== null) {
      this.token = datas['token'];
      localStorage.setItem('logintoken', this.token);
      this._r.navigate(['/dashboard']);
      }
}
 );
  /* map(
      (res) => {res.json(); console.log('adfssdfs'); console.log(res); }
    );
   */   //   this._http.post()


  }

}
