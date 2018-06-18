import { Component, OnInit, Input } from '@angular/core';
import { LoginstatusService } from '../../loginstatus.service';
import { TaskResolver } from '../../services/taskresolver.service';
import { Router , ActivatedRoute , NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isLoggedIn: boolean;
appName: String;
@Input() caller;
text = "Register";
  constructor(private _lls: LoginstatusService,private _trs: TaskResolver ,private _rr: Router,  private _ar: ActivatedRoute) { 
    if(this.caller === 'register')
    {
      this.text = 'Login'
    }
    this._rr.events.subscribe(
      (res) => {
        if (res instanceof NavigationEnd) {
          const data = this._ar.snapshot.queryParams;
  
          if (data['user'] === 'new') {
              this.text =' Login'
          }

      }
      });
    
    this._trs.getAppDetails().subscribe((data) => {
      data = data.json();
        console.log(data);
        console.log('resss');
        this.appName = data['name'];
   //     this.appName = res['']
    });

  }

  register(text) {
    if(text === 'Register')
    this._rr.navigate(['register'],{queryParams : {user:'new'}});
    else
    this._rr.navigate(['']);

  }

  ngOnInit() {
    this._lls.loggedIn.subscribe((res) => {
      this.isLoggedIn = res;
    })
  }

}
