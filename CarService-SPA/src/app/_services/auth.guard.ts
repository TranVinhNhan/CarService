import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
    ) {}

    canActivate(): boolean {
      if (this.authService.loggedIn() && this.authService.decodedToken.role === 'Admin') {
        return true;
      }
      this.alertify.error('User Error!');
      this.router.navigate(['/']);
      return false;
    }
}
