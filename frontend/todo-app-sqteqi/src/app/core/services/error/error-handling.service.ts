import { ErrorHandlerCreatorBase, handlerFactory, AuthErrorFactory, DefaultErrorFactory } from './error-handler-factory';
import { SessionService } from './../session.service';
import { appRoutes } from '../../../routes';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorHandlerBase } from './handlers/base-error-handler';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  private availableHandlersMap: Map<handlerFactory, ErrorHandlerBase>;

  constructor(
    private router: Router,
    private session: SessionService
  ) {
    this.availableHandlersMap = new Map([
      ['AUTH', new AuthErrorFactory(this.router, this.session).create()],
      ['DEFAULT', new DefaultErrorFactory(this.router).create()]
    ]);
  }

  handleError(errorType?: handlerFactory) {
    if (errorType) {
      this.executeRequestedHandler(errorType);
    } else {
      this.executeDefaultErrorHandler();
    }
  }

  private executeDefaultErrorHandler() {
    this.availableHandlersMap.get('DEFAULT')?.handlerFN();
  }

  private executeRequestedHandler(errorType: handlerFactory) {
    const handler = this.availableHandlersMap.get(errorType);
    if (handler) {
      handler.handlerFN();
    } else {
      this.executeDefaultErrorHandler();
    }
  }
}
