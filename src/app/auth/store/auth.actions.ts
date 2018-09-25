import { Action } from "@ngrx/store";


export const DO_SIGNUP = 'DO_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const DO_SIGNIN = 'DO_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class DoSignUp implements Action {
  readonly type = DO_SIGNUP;
  constructor(
    public payload: { username: string, password: string }
  ) { }
}
export class SignUp implements Action {
  readonly type = SIGNUP;
}
export class DoSignIn implements Action {
  readonly type = DO_SIGNIN;
  constructor(
    public payload: { username: string, password: string }
  ) { }
}
export class SignIn implements Action {
  readonly type = SIGNIN;
}
export class LogOut implements Action {
  readonly type = LOGOUT;
}
export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) { }
}

export type AuthActions =
  DoSignUp | SignUp |
  DoSignIn | SignIn |
  LogOut |
  SetToken;