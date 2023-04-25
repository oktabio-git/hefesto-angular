import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Diagnosis } from '../../interfaces/diagnosis';
import { PagedList } from '../../interfaces/pagedList';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  private diagnosisUrl: string = "http://localhost:8599/api/diagnosis";
  
  constructor(private _http: HttpClient) { }

  addDiagnosis(diagnosis: Diagnosis): Observable<Diagnosis> {
    return this._http.post(this.diagnosisUrl, diagnosis).pipe(
      map((response) => {
        return response as Diagnosis;
      })
    )
  }

  getLastestByPatientId(patientId: number): Observable<Diagnosis> {
    return this._http.get(`${this.diagnosisUrl}/patient/${patientId}/lastest`).pipe(
      map((response) => {
        return response as Diagnosis;
      })
    )
  }

  getDiagnosis(patientId: number): Observable<PagedList<Diagnosis>> {
    return this._http.get(`${this.diagnosisUrl}/patient/${patientId}/lastest`).pipe(
      map((response) => {
        return response as PagedList<Diagnosis>;
      })
    )
  }

  getByPatientId(patientId: number, page: number = 0, size: number = 5 ): Observable<PagedList<Diagnosis>> {
    return this._http.get(`${this.diagnosisUrl}/patient/${patientId}?page=${page}&size=${size}`).pipe(
      map((response) => {
        return response as PagedList<Diagnosis>;
      })
    )
  }
}
