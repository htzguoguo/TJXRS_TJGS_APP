import { ILoginState } from "../features/login/types";
import { ISettingState } from "../features/setting/types";
import { IBasicReportState } from "../features/basic_report/types";
import { ILoading } from "./loader/model";
import { IThemeState } from "./theme/model";
import { IUploadFilesState } from "./file/types";

export interface IStoreState {
  loginReducer: ILoginState;
  loadingReducer: ILoading;
  themeReducer: IThemeState;
  settingReducer: ISettingState;
  basicReportReducer: IBasicReportState;
  uploadFileReducer: IUploadFilesState;
}