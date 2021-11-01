import { Observable } from 'rxjs';
import { ErrorHandlingService } from '../../core/services/error/error-handling.service';
import { AuthService } from './../../core/services/auth.service';
import { Router } from '@angular/router';
import { SessionService } from './../../core/services/session.service';
import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { customValidators } from '../../shared/utils/custom-form.validators';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const sessionServiceMock = {
    setSession: jest.fn()
  };
  const routerMock = {
    navigate: jest.fn()
  };
  const authServiceMock = {
    login: jest.fn((credentials: {username: string, password: string}) => {
      return new Observable(observer => {
        if (credentials.username === 'gooduser') {
          observer.next({"access_token": "some token"})
        } else if (credentials.username === 'baduser') {
          observer.error(new HttpErrorResponse({status: 401}));
        } else {
          observer.error(new HttpErrorResponse({status: 500}));
        }
      });
    }),
    register: jest.fn((credentials: {username: string, password: string}) => {
      return new Observable(observer => {
        if(credentials.username === 'gooduser') {
          observer.next(credentials.username);
        } else {
          observer.error(new HttpErrorResponse({status: 500}));
        }
      });
    }),
  };
  const errorServiceMock = {
    gotoErrorPage: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        SharedModule
      ],
      providers: [
        {provide: SessionService, useValue: sessionServiceMock},
        {provide: Router, useValue: routerMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: ErrorHandlingService, useValue: errorServiceMock},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {

    test('should should subscribe to value changes in formGroup and push the subscription', () => {
      const subscribeToFormChangesSpy = jest.spyOn(component.loginForm.valueChanges, 'subscribe');
      expect(component["subscriptions"].length).toEqual(0);

      component.ngOnInit();

      expect(component["subscriptions"].length).toEqual(1);
      expect(subscribeToFormChangesSpy).toHaveBeenCalled();
    });
  });

  describe('on form value changes', () => {

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should set input error to empty state', () => {
      const subscribeToFormChangesSpy = jest.spyOn(component.loginForm.valueChanges, 'subscribe');
      component.inputError = {display: true, msg: 'some error'};
      fixture.detectChanges();

      component.confirmPassword?.setValue('a');

      expect(subscribeToFormChangesSpy).toHaveBeenCalled();
      expect(component.inputError).toEqual({display: false, msg: ''});
    });

    test('should set the error value for not matching password', () => {

      component.setRegister();
      jest.spyOn(customValidators, 'matchValidator').mockReturnValue(() => {return {fieldsDoesNotMatch: true}});
      fixture.detectChanges();

      component.confirmPassword?.setValue('b');
      fixture.detectChanges();

      expect(component.inputError).toEqual({display: true, msg: 'Passwords do not match'})
    });
  });

  describe('set register', () => {

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should call clearValidators method if register was true', () => {
      const clearValidatorsSpy = jest.spyOn<any, any>(component, 'clearControlsValidators');
      component.register = true;
      component.setRegister();

      expect(component.register).toBeFalsy();
      expect(clearValidatorsSpy).toHaveBeenCalled();
    });

    test('should call setValidators method if register was false', () => {
      const setValidatorsSpy = jest.spyOn<any, any>(component, 'setValidators');
      component.register = false;
      component.setRegister();

      expect(component.register).toBeTruthy();
      expect(setValidatorsSpy).toHaveBeenCalled();
    });

    test('should set the value for the action buttons correctly', () => {
      component.register = true;
      component.setRegister();

      expect(component.submitButtonText).toEqual('Login');
      expect(component.secondaryButtonText).toEqual('Register');

      component.setRegister();

      expect(component.submitButtonText).toEqual('Register');
      expect(component.secondaryButtonText).toEqual('Login');
    })

  });

  describe('Submit', () => {

    test('should not call either login or register endpoints if form is invalid', () => {
      const loginSpy = jest.spyOn(authServiceMock, 'login');
      const registerSpy = jest.spyOn(authServiceMock, 'register');

      fixture.detectChanges();

      expect(loginSpy).not.toHaveBeenCalled()
      expect(registerSpy).not.toHaveBeenCalled()
    });

    test('should subscribe to the login endpoint and push the subscription', () => {
      component.register = false;
      component.username?.setValue('someuser');
      component.password?.setValue('somepassword');

      fixture.detectChanges();

      const previousSubsAmount = component["subscriptions"].length;
      component.submit();
      const currentSubsAmount = component["subscriptions"].length;

      expect(authServiceMock.login).toHaveBeenCalledWith({username: 'someuser', password: 'somepassword'});
      expect(authServiceMock.register).not.toHaveBeenCalled();
      expect(currentSubsAmount).toEqual(previousSubsAmount + 1);
    });

    test('should subscribe to the register endpoint and push the subscription', () => {
      jest.clearAllMocks();
      component.register = true;
      component.username?.setValue('someuser');
      component.password?.setValue('somepassword');
      component.confirmPassword?.setValue('somepassword');

      fixture.detectChanges();

      const previousSubsAmount = component["subscriptions"].length;
      component.submit();
      const currentSubsAmount = component["subscriptions"].length;

      expect(authServiceMock.register).toHaveBeenCalledWith({username: 'someuser', password: 'somepassword'});
      expect(authServiceMock.login).not.toHaveBeenCalled();
      expect(currentSubsAmount).toEqual(previousSubsAmount + 1);
    });
  })

  test('should call handleSuccessfulLogin method if login is successful', () => {
    jest.clearAllMocks();

    const handleSuccessfulLoginSpy = jest.spyOn<any, any>(component, 'handleSuccessfulLogin');

    component.register = false;
    component.username?.setValue('gooduser');
    component.password?.setValue('somepassword');

    component.submit();

    expect(handleSuccessfulLoginSpy).toHaveBeenCalled();
  });

  test('should call handleLoginError method if login is successful', () => {
    jest.clearAllMocks();

    const handleLoginErrorSpy = jest.spyOn<any, any>(component, 'handleLoginError');

    component.register = false;
    component.username?.setValue('baduser');
    component.password?.setValue('somepassword');

    component.submit();

    expect(handleLoginErrorSpy).toHaveBeenCalled();
  });

  test('should call handleSuccessfulRegister method if login is successful', () => {
    jest.clearAllMocks();

    const handleSuccessfulRegisterSpy = jest.spyOn<any, any>(component, 'handleSuccessfulRegister');

    component.register = true;
    component.username?.setValue('gooduser');
    component.password?.setValue('somepassword');
    component.confirmPassword?.setValue('somepassword');

    component.submit();

    expect(handleSuccessfulRegisterSpy).toHaveBeenCalled();
  });

  test('should call handleRegisterError method if login is successful', () => {
    jest.clearAllMocks();

    const handleRegisterErrorSpy = jest.spyOn<any, any>(component, 'handleRegisterError');

    component.register = true;
    component.username?.setValue('baduser');
    component.password?.setValue('somepassword');
    component.confirmPassword?.setValue('somepassword');

    component.submit();

    expect(handleRegisterErrorSpy).toHaveBeenCalled();
  });

});
