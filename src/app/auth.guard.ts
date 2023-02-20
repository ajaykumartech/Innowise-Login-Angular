import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserenvironmentsService } from './userenvironments.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticate();
  }
  constructor(private userEnvironments: UserenvironmentsService, private router: Router) { }

  private authenticate(): boolean {
    if (!this.userEnvironments.isLoggedIn()) {
      this.router.navigateByUrl("/");
      return false;
    } else {
      return true;
    }
  }
  
}
