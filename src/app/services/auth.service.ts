import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = 'http://localhost:8080/api/auth/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private _http: HttpClient,
    private _cookieService: CookieService
  ) {}

  isAuthenticated(): boolean {
    const token = this._cookieService.get('token');
    if (token) return true;
    else return false;
  }

  login(username: string, password: string) {
    return this._http.post(
      this.authUrl + 'signin',
      {
        username,
        password,
      },
      this.httpOptions
    );
  }

  logout() {
    this._cookieService.delete('token');
    // return this._http.post(this.authUrl + 'signout', {}, this.httpOptions);
  }
}
