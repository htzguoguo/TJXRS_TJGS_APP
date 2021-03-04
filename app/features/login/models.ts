export interface ILoginSuccessResponse {
  access_token: string;
  desc: string;
  expires_in: number;
  refresh_token: string;
  status: string;
  token_type: string;
  user: IUser;
}

export interface IUser {
  readonly items: {
    menus: IMenu[];
    defaultMenuUrl: string;
    defaultMenuKey: string;
  };

  name: string;
  chsName: string;
  engName: string;
  password: string;
  deptName: string;
  deptNum: string;
  menus: string;
  mobile: string;
  memo: string;
}

interface IBaseMenu {
  key: string;
  name: string;
  icon: string;
  url: string;
}

export interface IThirdMenu extends IBaseMenu {
  matchurl: string;
}

export interface ISecondMenu extends IBaseMenu {
  child: IThirdMenu[];
}

export interface IMenu extends IBaseMenu {
  baseurl: string;
  child: ISecondMenu[];
}

export interface ILoginRequestState {
  type: String;
  username: string;
  password: string;
}

interface IResponse {
  id: number;
}

export interface ILoginResponseState {
  type: String;
  response: ILoginResponse;
}