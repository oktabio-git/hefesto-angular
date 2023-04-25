import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Diagnosis } from 'src/app/interfaces/diagnosis';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/interfaces/patient';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent {
  @ViewChild('closeModal') closeModal!: ElementRef;
  
  selectedPatient!: Patient;
  hideSpinner: boolean = true;

  diagnosisItem: Diagnosis = {
    diagnosis_id: 0,
    diagnosis: '',
    patientId: 0,
    condition: '',
    treatment: '',
    createdAt: ''
  };

  diagnosisForm: FormGroup = this._fb.group({
    diagnosis: ['', Validators.required],
    condition: ['', Validators.required],
    treatment: ['', Validators.required],
  });
  
  constructor(private _router: Router, private _diagnosisService: DiagnosisService, private _snackBar: MatSnackBar, private _fb: FormBuilder, private _patientService: PatientService) {}

  ngOnInit(): void {
    this._patientService.selectedPatient$.pipe(
      filter(z => z.id > 0),
      switchMap(sourcePatient => {
        this.selectedPatient = sourcePatient;
        return this._diagnosisService.getLastestByPatientId(sourcePatient.id);
      })
    ).subscribe({
      next: (result) => { this.diagnosisItem = result },
      error: (error) => { console.log(error.error.message) }
    });
  }
  
  onSubmit(): void {
    if (this.diagnosisForm.valid) {
      this.diagnosisItem = {...this.diagnosisForm.value};
      this.diagnosisItem.patientId = this.selectedPatient.id;
      this.addDiagnosis(this.diagnosisItem);
    } else {
      this.diagnosisForm.markAllAsTouched();
    }
  }

  goDiagnosisList(): void {
    this._router.navigateByUrl(`/diagnosis/${this.diagnosisItem.patientId}`);
  }

  addDiagnosis(diagnosis: Diagnosis):void {
    this.toggleSpinner();
    this._diagnosisService.addDiagnosis(diagnosis).subscribe({
      next: (response: Diagnosis) => { 
        this.diagnosisItem = response; 
        this.openSnackBar('Diagnosis saved succesfully');
      },
      error: (error) => {
        console.log(error.error);
        this.openSnackBar(error.error.message);
      },
      complete: () => {
        this.toggleSpinner();
        this.closeModal.nativeElement.click(); //close modal
      }
    });
  }

  openSnackBar(message: string, action: string = 'close') {
    this._snackBar.open(message, action, {
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }

  toggleSpinner() {
    this.hideSpinner = !this.hideSpinner;
  }

  @HostListener('hide.bs.modal', ['$event']) 
  onHideModal(_event: any) {
    this.diagnosisForm.reset();
    this.diagnosisForm.clearValidators();
    this.diagnosisForm.updateValueAndValidity();
  }

  get diagnosis() {
    return this.diagnosisForm.get('diagnosis');
  }

  get condition() {
    return this.diagnosisForm.get('condition');
  }

  get treatment() {
    return this.diagnosisForm.get('treatment');
  }
}

