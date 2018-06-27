import { Component, OnInit ,ViewChild ,AfterViewInit} from '@angular/core';
import { Http } from '@angular/http';
import { TaskResolver } from '../services/taskresolver.service';
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject ,Subject } from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-singlecolumntable',
  templateUrl: './singlecolumntable.component.html',
  styleUrls: ['./singlecolumntable.component.css']
})
export class SinglecolumntableComponent implements OnInit , AfterViewInit {

  ELEMENT_DATA = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  //  displayedColumns = ['name', 'email', 'phone', 'company'];
    displayedColumns = ['link'];
    dataSource = new  MatTableDataSource<any>(this.ELEMENT_DATA);
   // dataSource = new UserDataSource(this._trs);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    // dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    constructor(private _http:Http,private _trs: TaskResolver) { 
    
    }
  

    ngOnInit() {
      this._trs.getsingleTableList().subscribe(
        (data) => {
          data = data.json();
          console.log(data);
          this.ELEMENT_DATA = data;
      //    this.dataSource =  data;
      this.dataSource = new  MatTableDataSource<any>(this.ELEMENT_DATA);
          this.update();
        });
    }
    update() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } 

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } 
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource['filter'] = filterValue;
      if (this.dataSource['paginator']) {
        this.dataSource['paginator'].firstPage();
      }
    }
  
}



export class UserDataSource extends DataSource<any> {
  constructor(private _trs: TaskResolver) {
    super();
  }
  connect() : Observable<any>{
    let myarray: Subject<any[]> = new BehaviorSubject<any[]>([]);
      this._trs.getsingleTableList().subscribe(
     
        (data) => {
          data = data.json();
          console.log('djhsdjkfhsdjfksdhnf');
          console.log(data);
          myarray.next(data);
         
      }
    );
    return myarray;
    

  }
  disconnect() {}
}



