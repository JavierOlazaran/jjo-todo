import { appRoutes } from './../../routes';
import { SessionService } from './../services/session.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate, CanLoad {

  constructor(
    private session: SessionService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.session.isLogged());

      if (!this.session.isLogged()) {
        this.router.navigate([appRoutes.LOGIN]);
      }
    return this.session.isLogged();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.session.isLogged()) {
        this.router.navigate([appRoutes.LOGIN]);
      }
    return this.session.isLogged();
  }
}
