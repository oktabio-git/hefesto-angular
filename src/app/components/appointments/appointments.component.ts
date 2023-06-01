import { Component, Input } from '@angular/core';
import { Patient } from 'src/app/interfaces/patient';
import { VitalSigns } from 'src/app/interfaces/vitalSigns';
import { VitalSignsResp } from 'src/app/interfaces/vitalSignsResp';
import { ToastService } from 'src/app/services/toast.service';
import { VitalSignsService } from 'src/app/services/vital-signs.service';
import { MatDialog } from '@angular/material/dialog';
import { VitalSignsDialogComponent } from '../dialogs/vital-signs-dialog-component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent {
  @Input() patient!: Patient;
  @Input() vitalSigns!: VitalSigns;

  constructor(
    private _vSignsService: VitalSignsService,
    private _toastService: ToastService,
    public dialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(VitalSignsDialogComponent, {
      data: { signs: this.vitalSigns, update: false },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: VitalSignsResp) => {
      if (result) {
        this._vSignsService
          .postVitalSigns(this.vitalSigns.appointmentId, result)
          .subscribe({
            next: (res: VitalSigns) => {
              this._toastService.openSnackBar(
                'Vital signs added successfully.',
                'success'
              );
              this.vitalSigns = res;
            },
            error: () => {
              this._toastService.openSnackBar(
                'Something went wrong, try later.',
                'error'
              );
            },
          });
      }
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(VitalSignsDialogComponent, {
      data: { signs: this.vitalSigns, update: true },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: VitalSignsResp) => {
      if (result) {
        this._vSignsService.updateVitalSigns(this.vitalSigns.id, result).subscribe({
          next: (res: VitalSigns) => {
            this._toastService.openSnackBar(
              'Vital signs added successfully.',
              'success'
            );
            this.vitalSigns = res;
          },
          error: () => {
            this._toastService.openSnackBar(
              'Something went wrong, try later.',
              'error'
            );
          },
        });
      }
    });
  }
}
