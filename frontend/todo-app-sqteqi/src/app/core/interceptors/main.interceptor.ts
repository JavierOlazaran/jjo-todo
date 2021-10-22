import { environment } from '../../../environments/environment';
import { SessionService } from './../services/session.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  private headers = new HttpHeaders({
    'Content-Type':  'application/json',
  });

  private authUrl: string;

  constructor(
    private session: SessionService
  ) {
    this.authUrl = `${environment.envConstants.apiBaseUrl}${environment.envConstants.authEndpoint}`;
  }

  /**
   * Adds Http headers. If the request is not for the auth endpoints it also adds the token,
   * @param request
   * @param next
   * @returns
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = `Bearer ${this.session.token}`;
    if (!request.url.startsWith(this.authUrl)) {
      this.headers = this.headers.set('Authorization', authToken);
    }
    return next.handle(request.clone({headers: this.headers}));
  }
}
