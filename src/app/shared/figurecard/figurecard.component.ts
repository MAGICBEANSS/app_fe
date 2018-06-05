import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-figurecard',
  templateUrl: './figurecard.component.html',
  styleUrls: ['./figurecard.component.css']
})
export class FigurecardComponent implements OnInit {
  @Input() headerIcon: string;
  @Input() category: string;
  @Input() title: string;
  @Input() footerIcon: string;
  @Input() footContent: string;
  @Input() linearColor: string;
  @Input() boxShadow: string;
  @Input() data: Array<any>;
  displaydetails = false;
  constructor() { }

  ngOnInit() {
  }

  showhidedetails(value) {
   console.log('dfdff');
   console.log(value);
    this.displaydetails = !this.displaydetails;
  }

}
