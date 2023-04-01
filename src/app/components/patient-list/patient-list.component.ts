import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Patient } from 'src/app/interfaces/patient';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  @Input() patients: Patient[] = [];
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
