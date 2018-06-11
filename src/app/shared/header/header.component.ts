import { Component, OnInit } from '@angular/core';
import { LoginstatusService } from '../../loginstatus.service';
import { TaskResolver } from '../../services/taskresolver.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isLoggedIn: boolean;
appName: String;


  constructor(private _lls: LoginstatusService,private _trs: TaskResolver) { 
    
    this._trs.getAppDetails().subscribe((data) => {
      data = data.json();
        console.log(data);
        console.log('resss');
        this.appName = data['name'];
   //     this.appName = res['']
    });

  }

  ngOnInit() {
    this._lls.loggedIn.subscribe((res) => {
      this.isLoggedIn = res;
    })
  }

}
