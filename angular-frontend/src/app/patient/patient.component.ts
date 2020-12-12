import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { User } from '../_models/user';
import { Record } from '../_models/record';
import { UserService } from '../_services/user.service';
import { Output } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  @Input() records: Record[];
  @Input() prevProb: string;
  @Input() currMed: string;
  @Input() curPatient: String;
  @Input() patient : Object;
  @Output() deleteEvent = new EventEmitter<String>();
  @Output() recordEvent = new EventEmitter<String>();
  numRecords : Number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.numRecords = this.records.length;
    console.log(this.patient);

  }

  emitRecordGetter() {
    this.recordEvent.emit(this.curPatient);
  }

  deleteThisPatient() {
    this.userService.deletePatient(this.curPatient).pipe().subscribe((res) => {
      this.deleteEvent.emit("deleted");
    });
  }

}
