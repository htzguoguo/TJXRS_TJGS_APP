import { ILoginState } from "../features/login/types";
import { IWorkloadState } from "./workload/types";
import { IHighwayState } from "./highway/types";
import { IBasicReportState } from "../features/basic_report/types";
import { ILoading } from "./loader/model";
import { IThemeState } from "./theme/model";
import { IUploadFilesState } from "./file/types";

export interface IStoreState {
  loginReducer: ILoginState;
  loadingReducer: ILoading;
  themeReducer: IThemeState;
  workloadReducer: IWorkloadState;
  highwayReducer: IHighwayState,
  basicReportReducer: IBasicReportState;
  uploadFileReducer: IUploadFilesState;
}