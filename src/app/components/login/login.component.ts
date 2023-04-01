import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  password: boolean = false;

  constructor(private _router: Router) {}

  onSubmit(): void {
    this._router.navigate(['/patients']);
  }

  showHide(): void {
    this.password = !this.password;
  }
}
