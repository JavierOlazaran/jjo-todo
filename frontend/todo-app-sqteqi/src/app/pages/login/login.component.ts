import { appRoutes } from './../../routes';
import { Router } from '@angular/router';
import { ErrorHandlingService } from '../../core/services/error/error-handling.service';
import { SessionService } from './../../core/services/session.service';
import { AuthService } from './../../core/services/auth.service';
import { customValidators } from './../../shared/utils/custom-form.validators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  register: boolean = false;
  submitButtonText: string = 'Login';
  secondaryButtonText: string = 'Register';

  submitEnabled: boolean = false;
  inputError: {display: boolean, msg: string} = {display: false, msg: ''};

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private auth: AuthService,
    private session: SessionService,
    private errorSvc: ErrorHandlingService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscribeToFormChanges();
  }

  private subscribeToFormChanges() {
    const formChangesSubscription = this.loginForm.valueChanges.subscribe(changes => {
      this.handleFormChanges();
    });

    this.subscriptions.push(formChangesSubscription);
  }

  private handleFormChanges() {
    this.inputError = { display: false, msg: '' };
    if (this.loginForm?.errors?.fieldsDoesNotMatch) {
      this.inputError = { display: true, msg: 'Passwords do not match' };
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe;
    })
  }

  get username() {return this.loginForm.get('username')}
  get password() {return this.loginForm.get('password')}
  get confirmPassword() {return this.loginForm.get('confirmPassword')}

  setRegister() {
      this.register = !this.register;
      if (!this.register) {
        this.clearControlsValidators(this.loginForm, ["confirmPassword"]);
      } else {
        this.setValidators();
      }
      this.submitButtonText = this.register ? 'Register' : 'Login';
      this.secondaryButtonText = this.register ? 'Login' : 'Register';
  }

  private clearControlsValidators(form: FormGroup, controls?: string[] ) {
    this.confirmPassword?.clearValidators();
    this.confirmPassword?.updateValueAndValidity();
    this.loginForm.clearValidators();
    this.loginForm.updateValueAndValidity();
  }


  private setValidators() {
    this.confirmPassword?.setValidators(Validators.required);
    this.confirmPassword?.updateValueAndValidity();
    this.loginForm.setValidators(customValidators.matchValidator('password', 'confirmPassword'));
    this.loginForm.updateValueAndValidity();
  }

  // TODO: Other validations should be implemented in a productive app such as password
  // security policies amd maximum characters validation
  submit() {
    if (this.loginForm.valid) {
      const credentials = {
        username: this.username?.value,
        password: this.password?.value,
      }
      if (!this.register) {
        const loginSubscription = this.auth.login(credentials).subscribe(
          res => this.handleSuccessfulLogin(res),
          err => this.handleLoginError(err)
        );
        this.subscriptions.push(loginSubscription);
      } else {
        const registerSubscription = this.auth.register(credentials).subscribe(
          res => this.handleSuccessfulRegister(res),
          err => this.handleRegisterError(err)
        );
        this.subscriptions.push(registerSubscription);
      }
    }
  }

  private handleSuccessfulRegister(res: any) {
    this.register = false;
  }

  private handleRegisterError(error: any) {
    this.errorSvc.handleError('AUTH');
  }

  private handleSuccessfulLogin(response: any) {
    const {access_token} = response;
    this.session.setSession(access_token);
    this.router.navigate([appRoutes.TODO_LIST]);
  }

  private handleLoginError(error: any) {
    if(error.status === 401) {
      this.inputError = {display: true, msg: 'Wrong user or password'};
    } else {
      this.errorSvc.handleError('DEFAULT');
    }
  }
}
