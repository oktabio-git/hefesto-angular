import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { VitalSigns } from '../interfaces/vitalSigns';
import { VitalSignsResp } from '../interfaces/vitalSignsResp';
import { PagedList } from '../interfaces/pagedList';

@Injectable({
  providedIn: 'root',
})
export class VitalSignsService {
  private vSignsUrl: string = 'http://localhost:8082/vitalsigns';

  constructor(private _http: HttpClient) {}

  getVitalSigns(id: number, page: number): Observable<PagedList<VitalSigns>> {
    let params = new HttpParams().set('page', page);
    return this._http
      .get(this.vSignsUrl + `/patient/${id}`, {
        params: params,
      })
      .pipe(
        map((response) => {
          return response as PagedList<VitalSigns>;
        })
      );
  }

  getPatientVitalSigns(patientId: number): Observable<VitalSigns> {
    return this._http.get(this.vSignsUrl + `/${patientId}`).pipe(
      map((response) => {
        return response as VitalSigns;
      })
    );
  }

  postVitalSigns(appointmentId: number, signs: VitalSignsResp) {
    return this._http.post(this.vSignsUrl + `/${appointmentId}`, signs).pipe(
      map((response) => {
        return response as VitalSigns;
      })
    );
  }

  updateVitalSigns(id: number, signs: VitalSignsResp) {
    return this._http.put(this.vSignsUrl + `/${id}`, signs).pipe(
      map((response) => {
        return response as VitalSigns;
      })
    );
  }
}
