import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { TaskResolver } from '../services/taskresolver.service';
@Component({
  selector: 'app-gridlist',
  templateUrl: './gridlist.component.html',
  styleUrls: ['./gridlist.component.css']
})
export class GridlistComponent implements OnInit {
  tiles = [];
  constructor(private _http:Http,private _trs: TaskResolver) { 
    this._trs.getGridList().subscribe(
      (data) => {
        data = data.json();
        console.log(data);
        this.tiles = data;
      
      }
    );
  }

  ngOnInit() {
  }

}
