import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';

import { of } from 'rxjs';
import { loginFailure, loginSuccess } from '../actions/auth.actions';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Auth] Login Start'),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(user => loginSuccess({ user })),
          catchError(error => of(loginFailure({ error: error.message })))
        )
      )
    )
  );
}
