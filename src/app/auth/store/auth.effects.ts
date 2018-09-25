import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { firebase } from '@firebase/app';
import '@firebase/auth';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  @Effect()
  authSignUp = this.actions$.ofType(AuthActions.DO_SIGNUP).pipe(
    map((action: AuthActions.DoSignUp) => { return action.payload; }),
    switchMap(
      (authData: { username: string, password: string }) => {
        return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      }
    ),
    switchMap(() => { return from(firebase.auth().currentUser.getIdToken()); }),
    mergeMap(
      (token: string) => {
        this.router.navigate(['/']);
        return [
          { type: AuthActions.SIGNUP },
          { type: AuthActions.SET_TOKEN, payload: token }
        ];
      }
    )
  );

  @Effect()
  authSignIn = this.actions$.ofType(AuthActions.DO_SIGNIN).pipe(
    map((action: AuthActions.DoSignUp) => { return action.payload; }),
    switchMap(
      (authData: { username: string, password: string }) => {
        return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
      }
    ),
    switchMap(() => { return from(firebase.auth().currentUser.getIdToken()); }),
    mergeMap(
      (token: string) => {
        this.router.navigate(['/']);
        return [
          { type: AuthActions.SIGNIN },
          { type: AuthActions.SET_TOKEN, payload: token }
        ];
      }
    )
  );

  @Effect({ dispatch: false })
  authLogOut = this.actions$.ofType(AuthActions.LOGOUT).pipe(
    tap(() => { this.router.navigate(['/']); })
  );

  constructor(private router: Router, private actions$: Actions) { }

}