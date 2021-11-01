
export abstract class ErrorHandlerBase {

  constructor() {}

  abstract handlerFN(params?: any): any;
}
