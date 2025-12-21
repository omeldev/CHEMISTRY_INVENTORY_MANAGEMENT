import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (state.url === '/') {
    return router.createUrlTree(['/dashboard']);
  }
  return true;
};
