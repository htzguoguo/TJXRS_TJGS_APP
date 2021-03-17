import { ILoginState } from "../features/login/types";
import { ISettingState } from "../features/setting/types";
import { IBasicReportState } from "../features/basic_report/types";
import { ILoading } from "../models/reducers/loading";
import { IThemeState } from "../models/reducers/theme";

export interface IStoreState {
  loginReducer: ILoginState;
  loadingReducer: ILoading;
  themeReducer: IThemeState;
  settingReducer: ISettingState;
  basicReportReducer: IBasicReportState;
}