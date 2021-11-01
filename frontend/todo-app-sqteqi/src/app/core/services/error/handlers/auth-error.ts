import { SessionService } from './../../session.service';
import { appRoutes } from './../../../../routes';
import { Router } from '@angular/router';
import { ErrorHandlerBase } from "./base-error-handler";

export class AuthError extends ErrorHandlerBase {

  constructor(private router: Router, private session: SessionService) {
    super();
  }

  handlerFN() {
    this.session.removeSession();
    this.router.navigate([appRoutes.LOGIN]);
  }
}
