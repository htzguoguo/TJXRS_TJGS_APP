/*
 * Reducer actions related with login
 */
import * as types from './types';
import { ILoginResponse, ILoginSuccessResponse } from './models';


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

export function enableLoader() {
  return {
    type: types.LOGIN_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.LOGIN_DISABLE_LOADER,
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}
