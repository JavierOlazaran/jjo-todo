import { SessionService } from './../session.service';
import { appRoutes } from './../../../routes';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { ErrorHandlingService } from '../error/error-handling.service';
import { Router } from '@angular/router';

describe('ErrorHandlingService', () => {
  let service: ErrorHandlingService;
  let routerMock = {
    navigate: jest.fn(),
  };
  const sessionServiceMock = {
    removeSession: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: SessionService, useValue: sessionServiceMock },
      ]
    });
    service = TestBed.inject(ErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('gotoErrorPage method', () => {

    test('should navigate to error page', () => {
      const defaultHandlerSpy = jest.spyOn<any, any>(service, 'executeDefaultErrorHandler');
      const requestedHandlerSpy = jest.spyOn<any, any>(service, 'executeRequestedHandler');

      service.handleError();
      expect(defaultHandlerSpy).toHaveBeenCalled(),
      expect(requestedHandlerSpy).not.toHaveBeenCalled();

      jest.clearAllMocks();

      service.handleError('DEFAULT');
      expect(defaultHandlerSpy).not.toHaveBeenCalled(),
      expect(requestedHandlerSpy).toHaveBeenCalledWith('DEFAULT');

      jest.clearAllMocks();

      service.handleError('AUTH');
      expect(defaultHandlerSpy).not.toHaveBeenCalled(),
      expect(requestedHandlerSpy).toHaveBeenCalledWith('AUTH');
    })
  })
});
