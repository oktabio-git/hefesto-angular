import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/interfaces/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];
  constructor(private _patientService: PatientService) {}

  ngOnInit(): void {
    this._patientService.getPatients().subscribe((res: Patient[]) => {
      console.log(res);
      this.patients = res;
    })
  }
}
