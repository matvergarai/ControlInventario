import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'];
  const token = authService.getToken();

  if (token) {
    const decodedToken = jwtHelper.decodeToken(token);
    const role = decodedToken.role;

    if (authService.isLoggedIn() && role === expectedRole) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
