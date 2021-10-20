import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authEndpointUrl = `${environment.envConstants.apiBaseUrl}${environment.envConstants.authEndpoint}`;

  constructor(
    private http: HttpClient
  ) {}

  login(credentials: {username: string, password: string}): Observable<any>{
    return this.http.post(`${this.authEndpointUrl}/login`, credentials);
  }

  register(credentials: {username: string, password: string}): Observable<any>{
    return this.http.post(`${this.authEndpointUrl}/register`, credentials)
  }
}
