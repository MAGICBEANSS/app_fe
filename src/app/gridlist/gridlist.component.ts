import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { TaskResolver } from '../services/taskresolver.service';
@Component({
  selector: 'app-gridlist',
  templateUrl: './gridlist.component.html',
  styleUrls: ['./gridlist.component.css']
})
export class GridlistComponent implements OnInit {
  tiles = [];
  constructor(private _http:Http,private _trs: TaskResolver,     private _rr: Router,) { 
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
  routesto(menudata) {
    if(menudata.linktype == 'external')
{
  console.log('external ');
  console.log(menudata);
  console.log(menudata.link);
  let url: string = '';
if (!/^http[s]?:\/\//.test(menudata.link)) {
    url += 'http://';
}

url += menudata.link;
window.open(url, '_blank');
  console.log('done');
  return;
}
else if(menudata.linktype  == 'internal')

    console.log('internal');
    console.log(menudata);
  //  this.sideNav.close();
    this._rr.navigate([menudata['link']]);
}
  }

