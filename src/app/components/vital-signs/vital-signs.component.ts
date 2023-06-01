import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagedList } from 'src/app/interfaces/pagedList';
import { Patient } from 'src/app/interfaces/patient';
import { VitalSigns } from 'src/app/interfaces/vitalSigns';
import { PatientService } from 'src/app/services/patient.service';
import { VitalSignsService } from 'src/app/services/vital-signs.service';

@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.component.html',
  styleUrls: ['./vital-signs.component.css'],
})
export class VitalSignsComponent implements OnInit {
  vitalSigns: VitalSigns[] = [];
  pagedVitalSignsList!: PagedList<VitalSigns>;
  selectedPatient!: Patient;
  vitalSignsId: number = 0;
  pageNumber: number = 0;

  constructor(
    private _vitalSignsService: VitalSignsService,
    private _patientService: PatientService,
    private _route: ActivatedRoute
  ) {
    this._route.params.subscribe((params) => {
      this.vitalSignsId = params['id'];
    });
    this._route.queryParams.subscribe((params) => {
      this.pageNumber = params['page'] | 0;
    });
    console.log(this.vitalSignsId);
    console.log(this.pageNumber);
  }

  ngOnInit(): void {
    this._vitalSignsService
      .getVitalSigns(this.vitalSignsId, this.pageNumber)
      .subscribe({
        next: (result) => {
          this.vitalSigns = [...result.content];
          this.getPatient(this.vitalSigns[0].patientId);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  changePage(pageNumberEvent: number) {
    this.pageNumber = pageNumberEvent;
    this._vitalSignsService
      .getVitalSigns(this.vitalSignsId, this.pageNumber)
      .subscribe({
        next: (result) => {
          this.vitalSigns = [...result.content];
        },
        error: (error) => {
          console.log(error.error.message);
        },
      });
  }

  getPatient(id: number) {
    this._patientService.getPatient(id).subscribe({
      next: (result) => {
        this.selectedPatient = result;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
