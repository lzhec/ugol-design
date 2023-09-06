import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  CanLoad,
  Route,
  UrlSegment,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '@shared/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  private isValidToken$: Observable<boolean>;

  constructor(private auth: AuthenticationService) {
    this.isValidToken$ = this.auth.validate().pipe(
      tap((valid) => {
        if (!valid) {
          this.auth.logout();
        }
      })
    );
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.isValidToken$;
  }

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.isValidToken$;
  }

  public canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.isValidToken$;
  }
}
