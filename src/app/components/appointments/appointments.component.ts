import { Component, Input } from '@angular/core';
import { Patient } from 'src/app/interfaces/patient';
import { VitalSigns } from 'src/app/interfaces/vital-signs';
import { VitalSignsResp } from 'src/app/interfaces/vital-signs-resp';
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
  @Input() vSigns!: VitalSigns;

  constructor(
    private _vSignsService: VitalSignsService,
    private _toastService: ToastService,
    public dialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(VitalSignsDialogComponent, {
      data: { signs: this.vSigns, update: false },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: VitalSignsResp) => {
      if (result) {
        this._vSignsService
          .postVitalSigns(this.vSigns.appointmentId, result)
          .subscribe({
            next: (res: VitalSigns) => {
              this._toastService.openSnackBar(
                'Vital signs added successfully.',
                'success'
              );
              this.vSigns = res;
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
      data: { signs: this.vSigns, update: true },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: VitalSignsResp) => {
      if (result) {
        this._vSignsService.updateVitalSigns(this.vSigns.id, result).subscribe({
          next: (res: VitalSigns) => {
            this._toastService.openSnackBar(
              'Vital signs added successfully.',
              'success'
            );
            this.vSigns = res;
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
