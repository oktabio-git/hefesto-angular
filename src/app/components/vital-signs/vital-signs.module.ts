import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from 'src/app/layout/layout.module';
import { VitalSignsComponent } from './vital-signs.component';
import { VitalSignsService } from 'src/app/services/vital-signs.service';
import { VitalSignsDialogComponent } from '../dialogs/vital-signs-dialog-component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from 'src/app/layout/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [VitalSignsService],
  declarations: [VitalSignsComponent, VitalSignsDialogComponent],
  exports: [VitalSignsComponent, NavbarComponent],
})
export class VitalSignsModule {}
