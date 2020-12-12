import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from '../_services/record.service';

@Component({
  selector: 'app-patient-record-view',
  templateUrl: './patient-record-view.component.html',
  styleUrls: ['./patient-record-view.component.css']
})
export class PatientRecordViewComponent implements OnInit {

  patient: String;
  patientRecords;
  feedbackForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recordService: RecordService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      feedback: ['']
    });
    this.patient = this.route.snapshot.paramMap.get('username');
    
    this.recordService.getAllPatientRecords(this.patient).pipe().subscribe(res=> { this.patientRecords = res;console.log(this.patientRecords); });
  }

  submitFeedback(id) {
    let feedbackreq = {
      feedback: this.feedbackForm.controls.feedback.value,
      recordid: id
    };
    this.feedbackForm.setValue({feedback: ""});
    this.recordService.giveFeedback(feedbackreq).pipe().subscribe(() => {
      this.recordService.getAllPatientRecords(this.patient).pipe().subscribe(res=> { this.patientRecords = res; });
    })
  }
}
