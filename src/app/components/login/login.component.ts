import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  passIcon: boolean = false;
  loginForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _cookieService: CookieService
  ) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const dateNow = new Date();
      dateNow.setMinutes(dateNow.getMinutes() + 10);
      this._cookieService.set('token', 'qwerty', {
        expires: dateNow,
      });
      this._router.navigate(['/patients']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  showHide(): void {
    this.passIcon = !this.passIcon;
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
