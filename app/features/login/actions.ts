/*
 * Reducer actions related with login
 */
import * as types from './types';
import {ILoginSuccessResponse } from './models';


export function requestLogin(username: string, password: string) {
  return {
    type: types.LOGIN_REQUEST,
    username,
    password,
  };
}

export function loginFailed(error: string) {
  return {
    type: types.LOGIN_FAILED,
    error
  };
}

export function onLoginResponse(response: ILoginSuccessResponse) {
  return {
    type: types.LOGIN_RESPONSE,
    response,
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}
