export interface IProps {}

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

export interface IRoadDefect {
  position: string;
  name: string;
  desc: string;
}
