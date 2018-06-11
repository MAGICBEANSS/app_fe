import { Component, OnInit, OnDestroy , ViewChild} from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import {AfterViewInit} from '@angular/core';
import { MatSidenav } from '@angular/material';
// import { ROUTES } from './sidebar-routes.config';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TaskResolver } from '../../services/taskresolver.service';
import { LoginstatusService } from '../../loginstatus.service';
@Component({
  selector: 'app-root-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  menuList: Array<any>;
  @ViewChild('side') public sideNav: MatSidenav;

  fillerNav = Array(10).fill(0).map((_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array(10).fill(0).map(() =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;
  public id: number;
  public loggedIn = false;
  public backgroundColor: string;
  public boxheight;
  constructor(private _trs: TaskResolver, changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher
    , public settingService: SettingsService ,
    private _loginstatusservice: LoginstatusService,
    private _route: Router) {
    // this.loggedIn = this._loginstatusservice.isLoggedIn;
    this._loginstatusservice.loggedIn.subscribe((res) => {
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
  }

  ngOnInit() {
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

  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.settingService.sidebarImageIndexUpdate.unsubscribe();
    this.settingService.sidebarColorUpdate.unsubscribe();
  }
  routeto() {
  //  this.sideNav.close();
    this._route.navigate(['loader'], {queryParams : {from: 'notother'}});
  }
  routesto(menudata: any) {
    console.log('ddddd');
    console.log(menudata);
  //  this.sideNav.close();
    this._route.navigate(['loader'], {queryParams : {frameurl: menudata.url}});
  }
  routesdiff() {
    this._route.navigate(['loader'], {queryParams : {from: 'other'}});
  }
  logout() {
    this._loginstatusservice.setLoggedIn(false);
  }
}
