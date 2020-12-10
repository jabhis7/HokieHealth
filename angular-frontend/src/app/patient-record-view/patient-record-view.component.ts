import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Record } from '../_models/record';
import { RecordService } from '../_services/record.service';

@Component({
  selector: 'app-patient-record-view',
  templateUrl: './patient-record-view.component.html',
  styleUrls: ['./patient-record-view.component.css']
})
export class PatientRecordViewComponent implements OnInit {

  patient: String;
  patientRecords;

  constructor(private route: ActivatedRoute,
              private recordService: RecordService) { }

  ngOnInit() {
    this.patient = this.route.snapshot.paramMap.get('username');
    this.recordService.getAllPatientRecords(this.patient).pipe().subscribe(res=> { this.patientRecords = res; })
  }
}
