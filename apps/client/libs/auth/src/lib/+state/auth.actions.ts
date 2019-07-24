import { User } from '@community/api';
import { createAction, props } from '@ngrx/store';

export const getUser = createAction('[Auth] GET_USER');

export const getUserSuccess = createAction(
  '[Auth] GET_USER_SUCCESS',
  props<{ user: User }>()
);

export const getUserFail = createAction(
  '[Auth] GET_USER_FAIL',
  props<{ error: Error }>()
);

export const login = createAction('[Auth] LOGIN');

export const loginSuccess = createAction(
  '[Auth] LOGIN_SUCCESS',
  props<{ user: User }>()
);

export const loginFail = createAction('[Auth] LOGIN_FAIL');

export const register = createAction('[Auth] REGISTER');

export const registerSuccess = createAction(
  '[Auth] REGISTER_SUCCESS',
  props<{ user: User }>()
);

export const registerFail = createAction('[Auth] REGISTER_FAIL');

export const logout = createAction('[Auth] LOGOUT');
