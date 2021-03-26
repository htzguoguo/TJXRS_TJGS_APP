import { IWorkloadPageDto } from "./services/workload.dto";

 


export interface IWorkloadItem {
  id?: number;

  CaseCatalog: string;

  ParentCatalogName: string;

  SubName: string;

  ViewResult: string;

  DealWithDesc: string;

  FacilityDesc: string;

  MonitoringUnit: string;

  TimelimitA: number;

  FinishedStandard: string;

  DutyID: string;

  DealWith: string;

  RegistStandard: string;

  SubNum: string;

  CaseOrder: number;

  SelectCount: number;

  StatisticsOrder: number;

  AssociateUsersID: string;
}

export interface IWorkloadQueryResponseState {
  type: String;
  response: IWorkloadPageDto;
}


