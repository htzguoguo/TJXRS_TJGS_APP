

 
import * as types from './types'; 

import { ILoginState } from './types';
import {
  ILoginRequestState,
  ILoginResponseState,
} from './models';
import { dropAuth, saveAuth } from '../../utils/authUtils';
import createReducer from '../../lib/createReducer';

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
  [types.LOGIN_RESPONSE](state: ILoginState, action: ILoginResponseState) { 
    const user = action.response  
    saveAuth(user.token_type, user.access_token, user.user.name);
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
    dropAuth();
    return {
      ...state,
      error: '',
      isLoggedIn: false,
    };
  },
});