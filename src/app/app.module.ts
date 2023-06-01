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
import { DecimalDirective } from './directives/decimal.directive';
import { CookieService } from 'ngx-cookie-service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { VitalSignsComponent } from './components/vital-signs/vital-signs.component';
import { LayoutModule } from '@angular/cdk/layout';
import { VitalSignsModule } from './components/vital-signs/vital-signs.module';

const appRoutes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'patients', component: PatientComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'vital-signs/:id', component: VitalSignsComponent, canActivate: [authGuard] },
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    LayoutModule,
    VitalSignsModule
  ],
  providers: [PatientService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
