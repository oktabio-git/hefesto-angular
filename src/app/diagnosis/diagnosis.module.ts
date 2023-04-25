import { NgModule } from '@angular/core';

import { DiagnosisComponent } from './diagnosis.component';
import { routing } from './diagnosis.routing';
import { DiagnosisListComponent } from './diagnosis-list/diagnosis-list.component';
import { PatientService } from '../services/patient.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    routing
  ],
  declarations: [
    DiagnosisComponent, 
    DiagnosisListComponent
  ],
  exports: [ 
    DiagnosisComponent
  ],
  providers: [
    PatientService
  ]
})
export class DiagnosisModule { }
