import { Injectable } from '@angular/core';
import dayjs from 'dayjs';

export interface Session {
  token: string;
  exp: number;
  iat: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly sessionInitialState: Session = {
    token: '',
    exp: NaN,
    iat: NaN,
    username: ''
  };

  session: Session = this.sessionInitialState;

  constructor() {}

  setSession(token: string) {
    localStorage.setItem('token', token);
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.session = {
      token: token,
      ...tokenPayload,
    }
  }

  removeSession() {
    this.session = this.sessionInitialState;
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getExpirationTime(): number {
    return this.session.exp;
  }

  getUsername(): string {
    return this.session.username;
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');

    if (!token) return false;

    if (isNaN(this.session.exp)) {
      this.setSession(token)
    }

    const parsedExp = dayjs.unix(this.session.exp);
    const tokenHasExpired = parsedExp.isBefore(dayjs());

    return !tokenHasExpired;
  }
}
