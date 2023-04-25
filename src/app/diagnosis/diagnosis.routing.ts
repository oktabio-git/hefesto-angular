import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiagnosisListComponent } from './diagnosis-list/diagnosis-list.component';

const routes: Routes = [
  { path: '', component: DiagnosisListComponent }
];

export const routing: ModuleWithProviders<any> = RouterModule.forChild(routes);