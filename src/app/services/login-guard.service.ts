
import { Injectable } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import { AuthService  } from './auth-service';

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(private authService: AuthService, private _r: Router) {}

  canActivate() {
    if (this.authService.isAuthenticated()) {
      this._r.navigate(['/dashboard']);
  }
    return !this.authService.isAuthenticated();
  }
}
