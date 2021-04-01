import { IReportBasicInfo } from "./model";

export interface IProps {}

export const CREATE_BASIC_REPORT_REQUEST = 'CREATE_BASIC_REPORT_REQUEST';
export const CREATE_BASIC_REPORT_RESPONSE = 'CREATE_BASIC_REPORT_RESPONSE';
export const CREATE_BASIC_REPORT_FAILED = 'CREATE_BASIC_REPORT_FAILED';


export const UPDATE_BASIC_REPORT_REQUEST = 'UPDATE_BASIC_REPORT_REQUEST';
export const UPDATE_BASIC_REPORT_RESPONSE = 'UPDATE_BASIC_REPORT_RESPONSE';
export const UPDATE_BASIC_REPORT_FAILED = 'UPDATE_BASIC_REPORT_FAILED';
export interface IBasicReportState {
  reports: IReportBasicInfo[],
  error: string;
}



export interface IScrollPickerItem {
  value: string;
  label: string;
}

export interface IScrollPickerState {
  index: number;
  item: IScrollPickerItem;
}




