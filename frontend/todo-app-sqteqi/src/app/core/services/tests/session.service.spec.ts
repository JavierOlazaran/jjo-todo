import { TestBed } from '@angular/core/testing';

import { SessionService } from '../session.service';
import dayjs from 'dayjs';

describe('SessionService', () => {
  let service: SessionService;
  const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjEiLCJpYXQiOjE2MzQ1MjA3NTEsImV4cCI6MTYzNDUyMTM1MX0.FMJdqYAaH1Eu61pJNZ3w-w8in9E9jDbtJetyz1rq104';
  const testTokenPayload = {
    user: 'user1',
    iat: 1634520751,
    exp: 1634521351
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setSession', () => {

    test('should should save token in local storage', () => {
      localStorage.removeItem('token');
      service.setSession(testToken);

      const recoveredToken = localStorage.getItem('token');

      expect(recoveredToken).toEqual(testToken);
    });

    test('should should save token in local storage', () => {
      localStorage.removeItem('token');
      service.setSession(testToken);

      const recoveredToken = localStorage.getItem('token');

      expect(recoveredToken).toEqual(testToken);
    });

    test('should parse token and save session object', () => {
      service.setSession(testToken);

      expect(service.session).toEqual({token: testToken, ...testTokenPayload})
    })
  });

  describe('removeSession', () => {

    beforeEach(() => {
      service.setSession(testToken);
    });

    test('should remove token from local storage', () => {

      expect(localStorage.getItem('token')).toEqual(testToken);

      service.removeSession();

      expect(localStorage.getItem('token')).toEqual(null);
    });

    test('should set session object to the initial value', () => {
      expect(service.session).toEqual({
        token: testToken,
        ...testTokenPayload
      });

      service.removeSession();

      expect(service.session).toEqual(service['sessionInitialState']);
    });
  });

  describe('getters', () => {

    beforeEach(() => {
      service.setSession(testToken);
    });

    test('should should return the correct values', () => {
      expect(service.token).toEqual(testToken);
      expect(service.session).toEqual({token: testToken ,...testTokenPayload});
      expect(service.username).toEqual(testTokenPayload.user);
      expect(service.exp).toEqual(testTokenPayload.exp);
    });
  });

  describe('isLogged', () => {

    test('should return false if expiration date is before current date', () => {
      const timeBefore = dayjs().subtract(1, 'm');
      service.setSession(testToken);
      service["_session"].exp = timeBefore.unix();

      expect(service.isLogged()).toBeFalsy();
    });

    test('should return false if token is not present in local storage', () => {
      localStorage.clear();

      expect(service.isLogged()).toBeFalsy();
    });

    test('should call setSession method if token is present local storage but session object expiration is not defined', () => {
      const setSessionSpy = jest.spyOn(service, 'setSession');
      localStorage.setItem('token', testToken);
      service['_session'].exp = NaN;

      service.isLogged();

      expect(setSessionSpy).toHaveBeenCalledWith(testToken);
    })


  })

});
