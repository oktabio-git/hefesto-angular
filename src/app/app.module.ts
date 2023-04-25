import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientService } from './services/patient.service';
import { NumberDirective } from './directives/number.directive';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { SummaryComponent } from './components/summary/summary.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DecimalDirective } from './directives/decimal.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { VitalSignsDialogComponent } from './components/dialogs/vital-signs-dialog-component';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { LayoutModule } from './layout/layout.module';

const appRoutes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'patients', component: PatientComponent, canActivate: [authGuard] },
 
  { path: 'login', component: LoginComponent },
  { 
    path: 'diagnosis/:patientId', 
    loadChildren: () => import('./diagnosis/diagnosis.module').then(m => m.DiagnosisModule)
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientComponent,
    NumberDirective,
    DecimalDirective,
    LoginComponent,
    SummaryComponent,
    AppointmentsComponent,
    VitalSignsDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    DiagnosisModule,
    LayoutModule
  ],
  providers: [PatientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
