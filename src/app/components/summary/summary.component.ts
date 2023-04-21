import { Component, Input } from '@angular/core';
import { Patient } from 'src/app/interfaces/patient';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  @Input() patient!: Patient;

  constructor() {}

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
}
