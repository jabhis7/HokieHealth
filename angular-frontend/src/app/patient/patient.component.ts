import { Component, OnInit, Input } from '@angular/core';
import { User } from '../_models/user';
import { Record } from '../_models/record';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  @Input() records: Record[];
  @Input() curPatient: User;
  numRecords : Number;

  constructor() { }

  ngOnInit() {
    this.numRecords = this.records.length;
  }

}
