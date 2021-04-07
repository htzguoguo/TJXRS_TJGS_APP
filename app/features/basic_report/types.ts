import { IReportBasicInfo } from "./model";

export interface IProps {}

export const CREATE_BASIC_REPORT_REQUEST = 'CREATE_BASIC_REPORT_REQUEST';
export const CREATE_BASIC_REPORT_RESPONSE = 'CREATE_BASIC_REPORT_RESPONSE';
export const CREATE_BASIC_REPORT_FAILED = 'CREATE_BASIC_REPORT_FAILED';


export const UPDATE_BASIC_REPORT_REQUEST = 'UPDATE_BASIC_REPORT_REQUEST';
export const UPDATE_BASIC_REPORT_RESPONSE = 'UPDATE_BASIC_REPORT_RESPONSE';
export const UPDATE_BASIC_REPORT_FAILED = 'UPDATE_BASIC_REPORT_FAILED';

export const DELETE_BASIC_REPORT_REQUEST = 'DELETE_BASIC_REPORT_REQUEST';
export const DELETE_BASIC_REPORT_RESPONSE = 'DELETE_BASIC_REPORT_RESPONSE';
export const DELETE_BASIC_REPORT_FAILED = 'DELETE_BASIC_REPORT_FAILED';

export const EMPTY_REPORT_LIST = 'EMPTY_REPORT_LIST';

export const SET_EDIT_REPORT = 'SET_EDIT_REPORT';

export const NULL_EDIT_REPORT = 'NULL_EDIT_REPORT';
export interface IBasicReportState {
  reports: IReportBasicInfo[],
  edit_report: IReportBasicInfo | null,
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




