import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientUrl: string = "http://localhost:8080";

  constructor(private _http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this._http.get(this.patientUrl + "/patients").pipe(
      map((response) => {
        return response as Patient[];
      })
    )
  }

  getPatient(id: number): Observable<Patient> {
    return this._http.get(this.patientUrl + `/patients/${id}`).pipe(
      map((response) => {
        return response as Patient;
      })
    )
  }
}
