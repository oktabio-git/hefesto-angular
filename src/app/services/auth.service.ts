import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = 'http://localhost:8080/api/auth/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private _http: HttpClient) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return true;
  }

  login(username: string, password: string): Observable<any> {
    return this._http.post(
      this.authUrl + 'signin',
      {
        username,
        password,
      },
      this.httpOptions
    );
  }

  logout(): Observable<any> {
    return this._http.post(this.authUrl + 'signout', {}, this.httpOptions);
  }
}
