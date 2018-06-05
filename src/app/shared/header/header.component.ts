import { Component, OnInit } from '@angular/core';
import { LoginstatusService } from '../../loginstatus.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isLoggedIn: boolean;
  constructor(private _lls: LoginstatusService) { }

  ngOnInit() {
    this._lls.loggedIn.subscribe((res) => {
      this.isLoggedIn = res;
    })
  }

}
