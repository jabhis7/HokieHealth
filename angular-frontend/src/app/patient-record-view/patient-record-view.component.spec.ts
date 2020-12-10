import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRecordViewComponent } from './patient-record-view.component';

describe('PatientRecordViewComponent', () => {
  let component: PatientRecordViewComponent;
  let fixture: ComponentFixture<PatientRecordViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRecordViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRecordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
