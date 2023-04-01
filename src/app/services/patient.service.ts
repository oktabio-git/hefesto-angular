import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientUrl: string = "http://localhost:8080/patients";

  constructor(private _http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this._http.get(this.patientUrl).pipe(
      map((response) => {
        return response as Patient[];
      })
    )
  }
}
