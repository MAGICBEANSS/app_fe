import { Component, OnInit } from '@angular/core';
import { Router, Route} from '@angular/router';
import { Http } from '@angular/http';
import { LoginstatusService } from '../../loginstatus.service';
import { TaskResolver } from '../../services/taskresolver.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  appName: String;
  constructor(private _router: Router, private http: Http,
    private _loginstatusservice: LoginstatusService,
    private _trs: TaskResolver
  ) {
    
 //   this.isLoggedIn = this._loginstatusservice.isLoggedIn;
  }

  ngOnInit() {
 //   this.isLoggedIn = this._loginstatusservice.isLoggedIn;

  }

  loginBtn() {
    this._loginstatusservice.setLoggedIn(true);
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
