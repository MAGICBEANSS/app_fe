import { Component, OnInit } from '@angular/core';
import { TaskResolver } from '../../services/taskresolver.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  wrapperclass = 'col-lg-12 col-md-12 col-sm-12 col-xs-12';
  pendingtask: Array<any>;
  countpendingtasks: number;
  pendingcol: any;
  constructor(private _trs: TaskResolver) {
  }

  ngOnInit() {
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

}
