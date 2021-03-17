import { IUser } from "./models";

 

// login
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOG_OUT = 'LOG_OUT';

export interface ILoginState {
  isLoggedIn: boolean;
  user?: IUser;
  username: string;
  url: string,
  error: string,
}

