import { IUploadFile } from '../../store/file/model';

export interface IReportBasicInfo {
  id: number;

  caseId: string;
  
  weather: string;

  category: string;

  suboption: string;

  inspection: string;

  damage: string;

  highwayNum: string;

  name: string;

  direction: string;

  lane: string;

  report: string;

  date: Date;

  stationType: string;

  kilometer: number;

  meter: number;

  endkilometer: number;

  endmeter: number;

  staterange: string;

  subname: string;

  station: string;

  stationOther: string;

  defect: IDefectInfo[];

  length: number;

  width: number;

  depth: number;

  amount: number;

  files: IUploadFile[];
}

export interface IDefectInfo {
  dealwithdesc: string;

  unit: string;

  standard: string;

  associate: string;

  length: number;

  width: number;

  depth: number;

  amount: number;
}
