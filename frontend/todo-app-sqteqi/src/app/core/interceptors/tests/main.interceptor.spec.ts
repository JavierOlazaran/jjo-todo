import { SessionService } from './../../services/session.service';
import { HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { MainInterceptor } from '../main.interceptor';

describe('MainInterceptor', () => {
  const sessionMock = {
    token: 'someSessionToken'
  }

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MainInterceptor,
      {provide: SessionService, useValue: sessionMock},
    ]
  }));

  it('should be created', () => {
    const interceptor: MainInterceptor = TestBed.inject(MainInterceptor);
    expect(interceptor).toBeTruthy();
  });

  test('should set Content-Type and Authorization headers', () => {
    const interceptor: MainInterceptor = TestBed.inject(MainInterceptor);
    const requestMock = new HttpRequest('GET', 'https://someUrl.com');
    const httpHandlerMock = {
      handle: jest.fn((request: HttpRequest<unknown>) => new Observable<any>(
        observer => {observer.next(request)}
      ))
    };
    let _req: any;

    interceptor.intercept(requestMock, httpHandlerMock).subscribe( (req: any) => {
      _req = req;
    });

    expect(_req?.headers.has('Content-Type')).toBe(true);
    expect(_req?.headers.has('Authorization')).toEqual(true);
    expect(_req?.headers.get('Content-Type')).toEqual('application/json');
    expect(_req?.headers.get('Authorization')).toEqual('Bearer someSessionToken');
  });

  test('should set Content-Type header only', () => {
    const interceptor: MainInterceptor = TestBed.inject(MainInterceptor);
    const requestMock = new HttpRequest('GET', `${environment.envConstants.apiBaseUrl}${environment.envConstants.authEndpoint}`);
    const httpHandlerMock = {
      handle: jest.fn((request: HttpRequest<unknown>) => new Observable<any>(
        observer => {observer.next(request)}
      ))
    };
    let _req: any;

    interceptor.intercept(requestMock, httpHandlerMock).subscribe( (req: any) => {
      _req = req;
    });

    expect(_req?.headers.has('Content-Type')).toBe(true);
    expect(_req?.headers.has('Authorization')).toEqual(false);
    expect(_req?.headers.get('Content-Type')).toEqual('application/json');
  });
});
