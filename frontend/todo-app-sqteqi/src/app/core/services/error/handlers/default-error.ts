import { appRoutes } from './../../../../routes';
import { Router } from '@angular/router';
import { ErrorHandlerBase } from "./base-error-handler";

export class DefaultErrorHandler extends ErrorHandlerBase {

  constructor(private router: Router) {
    super();
  }

  handlerFN() {
    this.router.navigate([appRoutes.ERROR]);
  }

}
