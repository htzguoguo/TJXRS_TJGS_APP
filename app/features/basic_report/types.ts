export interface IProps {}

export const CREATE_BASIC_REPORT_REQUEST = 'CREATE_BASIC_REPORT_REQUEST';
export const CREATE_BASIC_REPORT_RESPONSE = 'CREATE_BASIC_REPORT_RESPONSE';
export const CREATE_BASIC_REPORT_FAILED = 'CREATE_BASIC_REPORT_FAILED';

export interface IBasicReportState {
  error: string;
}

export interface IReportBasicInfo {
  caseid: string;
  lane: string;
  subject: string;
  category: string;
}

export interface IScrollPickerItem {
  value: string;
  label: string;
}

export interface IScrollPickerState {
  index: number;
  item: IScrollPickerItem;
}




