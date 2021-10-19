import { Router } from '@angular/router';
import { ErrorHandlingService } from './../../core/services/error-handling.service';
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
    private router: Router
  ) { }


  ngOnInit(): void {

    this.subscribeToFormChanges();
    this.username?.valueChanges.subscribe(a => console.log(a));
  }

  onBlur(event: any) {
    console.log(event.target.id);

  }

  private subscribeToFormChanges() {

    const formChangesSubscription = this.loginForm.valueChanges.subscribe(changes => {
      this.inputError = { display: false, msg: '' };
      if (this.loginForm?.errors?.fieldsDoesNotMatch) {
        this.inputError = { display: true, msg: 'Passwords do not match' };
      }
    });
    this.subscriptions.push(formChangesSubscription);
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
        this.confirmPassword?.clearValidators();
        this.confirmPassword?.updateValueAndValidity();
        this.loginForm.clearValidators();
        this.loginForm.updateValueAndValidity();
      } else {
        this.confirmPassword?.setValidators(Validators.required);
        this.confirmPassword?.updateValueAndValidity();
        this.loginForm.setValidators(customValidators.matchValidator('password','confirmPassword'));
        this.loginForm.updateValueAndValidity();
      }
      this.submitButtonText = this.register ? 'Register' : 'Login';
      this.secondaryButtonText = this.register ? 'Login' : 'Register';
  }

  submit() {
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
        err => console.log(err)
      );
      this.subscriptions.push(registerSubscription);
    }
  }

  private handleSuccessfulRegister(res: any) {
    // TODO: Show toast with user created msg.

    this.register = false;
  }

  private handleRegisterError(error: any) {
    this.errorSvc.gotoErrorPage();
  }

  private handleSuccessfulLogin(response: any) {
    const {access_token} = response;
    this.session.setSession(access_token);
    this.router.navigate(['todo-list']);
  }

  private handleLoginError(error: any) {
    console.log(error.status);
    if(error.status === 401) {
      this.inputError = {display: true, msg: 'Wrong user or password'};
    } else {
      this.errorSvc.gotoErrorPage();
    }
  }
}
