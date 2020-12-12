import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { User } from '../_models/user';
import { Record } from '../_models/record';
import { UserService } from '../_services/user.service';
import { Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  @Input() age : Number;
  @Output() deleteEvent = new EventEmitter<String>();
  @Output() recordEvent = new EventEmitter<String>();
  rubricForm: FormGroup;
  numRecords : Number;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.numRecords = this.records.length;
    this.rubricForm = this.formBuilder.group({
      minhr: ['', Validators.pattern('^[1-9]\\d*')],
      maxhr: ['', Validators.pattern('^[1-9]\\d*')],
      deffb: ['']
    })
  }

  emitRecordGetter() {
    this.recordEvent.emit(this.curPatient);
  }

  rubricSubmit() {
    let rubric = {
      username: this.curPatient,
      minhr: this.rubricForm.value.minhr,
      maxhr: this.rubricForm.value.maxhr,
      deffb: this.rubricForm.value.deffb
    };
    this.userService.addRubric(rubric).pipe().subscribe((res) => {console.log(res)});
  }

  deleteThisPatient() {
    this.userService.deletePatient(this.curPatient).pipe().subscribe((res) => {
      this.deleteEvent.emit("deleted");
    });
  }

}
