import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params  , NavigationEnd} from '@angular/router';
// import { Navigation } from '../../../angular-material-dashboard_last_working/node_modules/@types/selenium-webdriver';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
srcurl = './assets/index1.html';
param: any;
sub;
  constructor(private _rr: Router, private _ar: ActivatedRoute) {
   this.sub = this._rr.events.subscribe(
    (res) => {
      if (res instanceof NavigationEnd) {
        const data = this._ar.snapshot.queryParams;
        if (data['from'] === 'other') {
               this.srcurl = `https://calendar.google.com/calendar/b/1/embed?height=600&amp;wkst=1&amp;
               bgcolor=%23FFFFFF&amp;src=b7ql6t9m4j1j06s645vi7
               en8cg%40group.calendar.google.com&amp;color=%2329527A&amp;ctz=Asia%2FCalcutta`;
         }
         else if(data['frameurl']!==null){
          console.log('data  frame url');
          console.log(data['frameurl']);
          this.srcurl = data['frameurl'];
          
        }
         else {
           this.srcurl = './assets/index1.html';
         }
      }
    });
   }

  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
