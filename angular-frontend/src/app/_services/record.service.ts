
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from '../_models/record';




@Injectable({ providedIn: 'root' })
export class RecordService {
    constructor(private http: HttpClient) { }
    
    getAllRecords() {
        return this.http.get<Record[]>(`http://localhost:3000/user/myrecords`);
    }

    getAllPatientRecords(pat) {
        return this.http.post(`http://localhost:3000/user/patientrecords`, {username: pat});
    }

    createRecord(rec) {
        return this.http.post(`http://localhost:3000/user/addrecord`, rec);
    }

}

