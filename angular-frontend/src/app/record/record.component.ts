import { Component, Input, OnInit } from '@angular/core';
import {User} from '../_models/user';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  @Input() recordDate : Date;
  @Input() heartrate : Number;
  @Input() feedback : String;
  @Input() user : User;
  displayDefaultRubric : Boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.feedback) {
      return;
    }
    if ( this.user.minhr >= this.heartrate || this.user.maxhr <= this.heartrate) {
      this.displayDefaultRubric = true;
    }
  }

}
