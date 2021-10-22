import { appRoutes } from './../../../routes';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { ErrorHandlingService } from '../error-handling.service';
import { Router } from '@angular/router';

describe('ErrorHandlingService', () => {
  let service: ErrorHandlingService;
  let routerMock = {
    navigate: jest.fn(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    });
    service = TestBed.inject(ErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('gotoErrorPage method', () => {

    test('should navigate to error page', () => {
      const navigateSpy = jest.spyOn(routerMock, 'navigate');
      service.gotoErrorPage();

      expect(navigateSpy).toHaveBeenCalledWith([appRoutes.ERROR]);
    })
  })
});
