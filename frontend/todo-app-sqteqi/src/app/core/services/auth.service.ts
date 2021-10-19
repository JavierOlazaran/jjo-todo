import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: {username: string, password: string}): Observable<any>{
    return this.http.post('http://localhost:3000/auth/login', credentials);
  }

  register(credentials: {username: string, password: string}): Observable<any>{
    return this.http.post('http://localhost:3000/auth/register', credentials)
  }
}
