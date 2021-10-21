import { appRoutes } from './../../../routes';
import { SessionService } from './../../services/session.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { LoggedGuard } from '../logged.guard';
import { Router } from '@angular/router';

describe('LoggedGuard', () => {
  let guard: LoggedGuard;
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/cookies'};
  const sessionServiceMock = {
    isLogged: jest.fn(),
  }
  const routerMock = {
    navigate: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: SessionService, useValue: sessionServiceMock},
        {provide: Router, useValue: routerMock},
      ]
    });
    guard = TestBed.inject(LoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {

    test('should navigate to login page and return false if user is not logged', () => {
      const navigateSpy = jest.spyOn(routerMock, 'navigate').mockClear();
      guard.isUserLogged = false;

      expect(guard.canActivate(routeMock, routeStateMock)).toBeFalsy();
      expect(navigateSpy).toHaveBeenCalledWith([appRoutes.LOGIN]);
    })

    test('should not call navigate and should return true if user is logged', () => {
      const navigateSpy = jest.spyOn(routerMock, 'navigate').mockClear();
      guard.isUserLogged = true;

      expect(guard.canActivate(routeMock, routeStateMock)).toBeTruthy();
      expect(navigateSpy).not.toHaveBeenCalled();
    })
  });

  describe('canLoad', () => {

    test('should navigate to login page and return false if user is not logged', () => {
      const navigateSpy = jest.spyOn(routerMock, 'navigate').mockClear();
      guard.isUserLogged = false;

      expect(guard.canLoad(routeMock, routeStateMock)).toBeFalsy();
      expect(navigateSpy).toHaveBeenCalledWith([appRoutes.LOGIN]);
    })

    test('should not call navigate and should return true if user is logged', () => {
      const navigateSpy = jest.spyOn(routerMock, 'navigate').mockClear();
      guard.isUserLogged = true;

      expect(guard.canLoad(routeMock, routeStateMock)).toBeTruthy();
      expect(navigateSpy).not.toHaveBeenCalled();
    })
  })

});
