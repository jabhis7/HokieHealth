import { Component, Input, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  @Input() recordDate : Date;
  @Input() heartrate : Number;

  constructor() { }

  ngOnInit() {

  }

}
