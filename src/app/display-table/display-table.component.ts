import { Component, OnInit, Input , ChangeDetectorRef } from '@angular/core';
import { ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  displayedColumns = ['name', 'sender', 'received', 'assigned_to' , 'duedata'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() showPagination ?: boolean;
  @Input() showFilter ?: boolean;
  @Input() data: any;


  constructor(private changeDetectorRefs: ChangeDetectorRef, private http: Http) {
    // Create 100 users
    const users: UserData[] = [];
    for (let i = 1; i <= 90; i++) { users.push(createNewUser(i)); }



    // this.dataSource.connect();(
    console.log('ssassa');
    console.log(this.data);
  //  this.changeDetectorRefs.detectChanges();
  }
  ngOnInit() {
    this.dtOptions = {
      pagingType: '',
      pageLength: 2
    };
   // this.dtTrigger.next();
  /*   this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.filterValue = '';
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('datasource');
    console.log(this.dataSource);
    console.log('ssassa 2 ');
    console.log(this.data); */
  //  this.changeDetectorRefs.detectChanges();
  }

  refresh() {
      this.changeDetectorRefs.detectChanges();
    };


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}



