import { Component, OnInit , AfterViewInit } from '@angular/core';
import { TaskResolver } from '../../services/taskresolver.service';
declare const swal: any;
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , AfterViewInit{
  isConnected$: Observable<boolean>;
  isonline: boolean;
  wrapperclass = 'col-lg-12 col-md-12 col-sm-12 col-xs-12';
  pendingtask: Array<any>;
  countpendingtasks: number;
  pendingcol: any;
  constructor(private _trs: TaskResolver) {

    this.isConnected$ = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false));
    this.openAlert();
    this._trs.getPendingTask().subscribe(
      (data) => {
        console.log('pending tasks');
        data = data.json();
        console.log(data);
        this.pendingtask = data;
        this.countpendingtasks = this.pendingtask.length;
      }
    );
  
  }

  ngOnInit() {
    
  }
  ngAfterViewInit()
  {
    window.scrollTo(0, 0);
  }

  openAlert() {
this.isConnected$.subscribe((value) => {
  if(value == false)
      {
        swal({
          title: 'You are Offline!!',
          text: 'We still keep you going..',
          confirmButtonClass: 'btn btn-warning'
        });
      }
});

       
      }
        


}
