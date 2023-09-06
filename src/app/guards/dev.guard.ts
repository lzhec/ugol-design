import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DevGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.check();
  }

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.check();
  }

  public canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.check();
  }

  private check(): boolean {
    if (environment.production) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}

