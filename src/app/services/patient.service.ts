import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientUrl: string = "http://localhost:8080/patients";
  private patient$ = new BehaviorSubject<Patient>({ id:0, name: '', lastName:'', socialSecurityNumber: '', phone:'', birthDate: '' });
  selectedPatient$ = this.patient$.asObservable();

  constructor(private _http: HttpClient) { }

  setPatient(patient: Patient) {
    this.patient$.next(patient);
  }

  getPatients(): Observable<Patient[]> {
    const ofPatient = of([
      { id:1, name: 'Jose', lastName:'Galinier', socialSecurityNumber: '07-95-75-9554-8', phone:'8443655306', birthDate: '05/05/1990' },
      { id:2, name: 'Ivan', lastName:'Cano', socialSecurityNumber: '09-95-75-5555-8', phone:'84454655306', birthDate: '06/06/1986' }
    ]);
    return ofPatient;
    return this._http.get(this.patientUrl).pipe(
      map((response) => {
        return response as Patient[];
      })
    )
  }

  getPatientById(patientId: number): Observable<Patient> {
    const ofPatient = of({ id:1, name: 'Jose', lastName:'Galinier', socialSecurityNumber: '07-95-75-9554-8', phone:'8443655306', birthDate: '05/05/1990' });
    return ofPatient;
  }
}
