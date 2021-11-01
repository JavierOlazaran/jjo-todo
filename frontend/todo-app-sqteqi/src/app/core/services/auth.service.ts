import { UserCredentials } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResponseDTO, RegisterResponseDTO } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authEndpointUrl = `${environment.envConstants.apiBaseUrl}${environment.envConstants.authEndpoint}`;

  constructor(
    private http: HttpClient
  ) {}

  login(credentials: UserCredentials): Observable<LoginResponseDTO>{
    return this.http.post<LoginResponseDTO>(`${this.authEndpointUrl}/login`, credentials);
  }

  register(credentials: UserCredentials): Observable<RegisterResponseDTO>{
    return this.http.post<RegisterResponseDTO>(`${this.authEndpointUrl}/register`, credentials)
  }
}
