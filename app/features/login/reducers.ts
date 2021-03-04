

import createReducer from 'app/lib/createReducer';
import * as types from './types'; 

import { ILoginState } from './types';
import {
  ILoginRequestState,
  ILoginResponseState,
} from './models';

const initialState: ILoginState = {
  isLoggedIn: false,
  user: undefined,
  username: '',
  url: '',
  error: '',
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state: ILoginState, action: ILoginRequestState) {
    return {
      ...state,
      error: '',
      username: action.username,
      password: action.password,
    };
  },
  [types.LOGIN_DISABLE_LOADER](state: ILoginState) {
    return { ...state };
  },
  [types.LOGIN_RESPONSE](state: ILoginState, action: ILoginResponseState) {   
    return {
      ...state,
      error: '',
      user: action.response.user,
      username: action.response.user.chsName,
      isLoggedIn: true,
    };
  },
  [types.LOGIN_FAILED](state: ILoginState, error: string) {
    return {
      ...state,
      error,
      isLoggedIn: false,
    };
  },
  [types.LOG_OUT](state: ILoginState) {
    return {
      ...state,
      error: '',
      isLoggedIn: false,
    };
  },
});