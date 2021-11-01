import { DefaultErrorHandler } from './handlers/default-error';
import { SessionService } from './../session.service';
import { Router } from '@angular/router';
import { AuthError } from './handlers/auth-error';
import { ErrorHandlerBase } from "./handlers/base-error-handler";

export type handlerFactory = 'DEFAULT' | 'AUTH';

export abstract class ErrorHandlerCreatorBase {
  abstract create(): ErrorHandlerBase;
}

export class AuthErrorFactory extends ErrorHandlerCreatorBase {
  constructor(private router: Router, private session: SessionService) {
    super();
  }

  create(): ErrorHandlerBase {
    return new AuthError(this.router, this.session);
  }
}

export class DefaultErrorFactory extends ErrorHandlerCreatorBase {
  constructor(private router: Router){
    super();
  }

  create(): ErrorHandlerBase {
    return new DefaultErrorHandler(this.router)
  }
}
