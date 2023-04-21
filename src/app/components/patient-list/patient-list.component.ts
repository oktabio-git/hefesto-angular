import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/interfaces/patient';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  @Input() patients: Patient[] = [];
  @Output() patientEvent = new EventEmitter<Patient>();
  myModal: any;
  patientForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    birthdate: ['', Validators.required],
    nss: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    if (this.patientForm.valid) {
    } else {
      console.log(this.patientForm);
      this.patientForm.markAllAsTouched();
    }
  }

  getAge(date: string): number {
    let bdate = new Date(date);
    let today = new Date();
    let age = today.getFullYear() - bdate.getFullYear();
    let m = today.getMonth() - bdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bdate.getDate())) {
      age--;
    }
    return age;
  }

  getInitials(name: string, lastName: string): string {
    return name.charAt(0) + lastName.charAt(0);
  }

  getPatientData(patient: Patient) {
    this.patientEvent.emit(patient);
  }

  get name() {
    return this.patientForm.get('name');
  }
  get lastName() {
    return this.patientForm.get('lastName');
  }
  get birthdate() {
    return this.patientForm.get('birthdate');
  }
  get nss() {
    return this.patientForm.get('nss');
  }
  get phone() {
    return this.patientForm.get('phone');
  }
}
