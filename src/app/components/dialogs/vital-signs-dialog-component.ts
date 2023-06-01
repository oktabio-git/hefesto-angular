import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { VitalSignsResp } from 'src/app/interfaces/vitalSignsResp';

@Component({
  selector: 'vital-signs-dialog',
  templateUrl: './vital-signs-dialog.component.html',
})
export class VitalSignsDialogComponent implements OnInit {
  vSignsForm: FormGroup = this._fb.group({
    temperature: ['', Validators.required],
    heartRate: ['', Validators.required],
    systolic: ['', Validators.required],
    diastolic: ['', Validators.required],
  });
  signsResp!: VitalSignsResp;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<VitalSignsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    if (this.data.update) {
      this.vSignsForm.get('temperature')?.setValue(this.data.signs.temperature);
      this.vSignsForm.get('heartRate')?.setValue(this.data.signs.heartRate);
      this.vSignsForm.get('systolic')?.setValue(this.data.signs.systolic);
      this.vSignsForm.get('diastolic')?.setValue(this.data.signs.diastolic);
    }
  }

  onSubmit(): void {
    if (this.vSignsForm.valid) {
      this.signsResp = {
        temperature: this.vSignsForm.get('temperature')?.value,
        heartRate: this.vSignsForm.get('heartRate')?.value,
        systolic: this.vSignsForm.get('systolic')?.value,
        diastolic: this.vSignsForm.get('diastolic')?.value,
      };
      this.dialogRef.close(this.signsResp);
    } else {
      this.vSignsForm.markAllAsTouched();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get temperature() {
    return this.vSignsForm.get('temperature');
  }
  get heartRate() {
    return this.vSignsForm.get('heartRate');
  }
  get systolic() {
    return this.vSignsForm.get('systolic');
  }
  get diastolic() {
    return this.vSignsForm.get('diastolic');
  }
}
