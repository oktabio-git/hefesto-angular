import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Diagnosis } from 'src/app/interfaces/diagnosis';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from 'src/app/services/patient.service';
import { filter, switchMap } from 'rxjs';
import { Patient } from '../../interfaces/patient';
import { PagedList } from 'src/app/interfaces/pagedList';

@Component({
  selector: 'app-diagnosis-list',
  templateUrl: './diagnosis-list.component.html',
  styleUrls: ['./diagnosis-list.component.css']
})
export class DiagnosisListComponent {
  diagnosis: Diagnosis[] = [];
  patientId: number = 0;
  selectedPatient!: Patient;
  pagedDiagnosisList!: PagedList<Diagnosis>;
  pagination: [] = [];
  
  pageNumber: number = 0;
  
  constructor(private _diagnosisService: DiagnosisService, private _route:ActivatedRoute, private _snackBar: MatSnackBar, private _patientService: PatientService) {
    this._route.params.subscribe(params => {
      this.patientId = params['patientId'];
    });
  }

  ngOnInit(): void {
    this._patientService.getPatientById(this.patientId).pipe(
      filter(p => p.id > 0),
      switchMap(sourcePatient => {
        this.selectedPatient = sourcePatient;
        return this._diagnosisService.getByPatientId(sourcePatient.id);
      })
    ).subscribe({
      next: (result) => {
        this.pagedDiagnosisList = { ...result };
        this.diagnosis = [...result.content].sort((a,b) => b.diagnosis_id - a.diagnosis_id); 
       },
      error: (error) => { console.log(error.error.message) }
    });
  }
  
  openSnackBar(message: string, action: string = 'close') {
    this._snackBar.open(message, action, {
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }

  changePage(pageNumberEvent: number){
    this.pageNumber = pageNumberEvent;
    
    this._diagnosisService.getByPatientId(this.patientId, this.pageNumber).subscribe({
      next: (result) => {
        this.diagnosis = [...result.content];
      },
      error: (error) => {
        console.log(error.error.message)
      }
    })
  }
}

