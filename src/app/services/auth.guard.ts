import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthStore } from "./auth.store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthStore, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.isAuth();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.isAuth();
  }
  private isAuth() {
    return this.auth.isLoggedIn$.pipe(
      map((loggedIn) => (loggedIn ? true : this.router.parseUrl("/login")))
    );
  }
}
