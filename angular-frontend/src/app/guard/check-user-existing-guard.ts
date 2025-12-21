import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from '../service/rest/user/user.service';
import {Store} from '@ngxs/store';
import {UserState} from '../store/user/user.state';
import {map, switchMap, take} from 'rxjs';

export const checkUserExistingGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);
  const userService = inject(UserService);

  return store.select(UserState.getUser).pipe(
    take(1),
    switchMap(user => {

      // AUTH ROUTES
      if (state.url.startsWith('/auth')) {
        return user
          ? [router.createUrlTree(['/'])]   // already logged in
          : [true];
      }

      // USER ALREADY LOGGED IN
      if (user) {
        return [true];
      }

      // CHECK IF USER EXISTS (BACKEND)
      return userService.isUserExisting$().pipe(
        map(exists =>
          exists
            ? router.createUrlTree(['/auth/login'])
            : router.createUrlTree(['/auth/register'])
        )
      );
    })
  );
};
