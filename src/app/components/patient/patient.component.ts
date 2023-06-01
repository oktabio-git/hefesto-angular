import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/interfaces/patient';
import { VitalSigns } from 'src/app/interfaces/vitalSigns';
import { PatientService } from 'src/app/services/patient.service';
import { VitalSignsService } from 'src/app/services/vital-signs.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];
  option: number = 0;
  patient!: Patient;
  vitalSigns!: VitalSigns;
  show: boolean = true;

  constructor(
    private _patientService: PatientService,
    private _vSignsService: VitalSignsService,
  ) {}

  ngOnInit(): void {
    this._patientService.getPatients().subscribe((res: Patient[]) => {
      this.patients = res;
    });
  }

  getPaitentData(patient: Patient): void {
    this._vSignsService.getPatientVitalSigns(patient.id).subscribe({
      next: (res: VitalSigns) => {
        this.patient = patient;
        this.option = 1;
        this.vitalSigns = res;
      },
      error: () => {
        // INSERT ERROR TOASTR
      },
    });
  }

  
}
