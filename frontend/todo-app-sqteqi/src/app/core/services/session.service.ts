import { Injectable } from '@angular/core';
import dayjs from 'dayjs';

export interface Session {
  token: string;
  exp: number;
  iat: number;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly sessionInitialState: Session = {
    token: '',
    exp: NaN,
    iat: NaN,
    user: ''
  };

  private _session: Session = this.sessionInitialState;

  constructor() {}

  setSession(token: string) {
    localStorage.setItem('token', token);
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this._session = {
      token: token,
      ...tokenPayload,
    }
  }

  removeSession() {
    this._session = this.sessionInitialState;
    localStorage.removeItem('token');
  }

  get session() { return this._session };

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get exp(): number {
    return this._session.exp;
  }

  get username(): string {
    return this._session.user;
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');

    if (!token) return false;

    if (isNaN(this._session.exp)) {
      this.setSession(token)
    }

    const parsedExp = dayjs.unix(this._session.exp);
    const tokenHasExpired = parsedExp.isBefore(dayjs());

    return !tokenHasExpired;
  }
}
