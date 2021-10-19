import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Session {
  token: string;
  sessionExpiration: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly sessionInitialState: Session = {
    token: '',
    sessionExpiration: NaN,
    username: ''
  };

  sessionSubject: BehaviorSubject<Session> = new BehaviorSubject(this.sessionInitialState);

  constructor() { }

  setSession(token: string) {
    localStorage.setItem('token', token);
    console.log(JSON.parse(atob(token.split('.')[1])));


//    this.sessionSubject.next()
  }

  removeSession() {}

  getSession() {}

  isLogged() {}
}
