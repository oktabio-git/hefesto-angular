import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { VitalSigns } from '../interfaces/vital-signs';
import { VitalSignsResp } from '../interfaces/vital-signs-resp';

@Injectable({
  providedIn: 'root',
})
export class VitalSignsService {
  private vSignsUrl: string = 'http://localhost:8081/vitalsigns';

  constructor(private _http: HttpClient) {}

  getVitalSigns(patientId: number): Observable<VitalSigns> {
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
