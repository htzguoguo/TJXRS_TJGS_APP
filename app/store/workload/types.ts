import { IWorkloadItem } from './models';
export const WORKLOAD_QUERY_REQUEST = 'WORKLOAD_QUERY_REQUEST';
export const WORKLOAD_QUERY_RESPONSE = 'WORKLOAD_QUERY_RESPONSE';
export const WORKLOAD_FAILED = 'WORKLOAD_FAILED';

export interface IWorkloadState {
  workloads: IWorkload;  
  workloads_count: number;
  error: string;
}



export interface IWorkload {
  category: string[];
  parent_category: {};
  subname: {};
  viewresult: {};
  dealwith: {};
}

export interface IRoadDefect {
  dealwithdesc: string;
  unit: string;
  amount: number;
  length: number;
  width: number;
  depth: number;
  standard: string;
  associate: string;
}



// export interface ISettingState {
//   workloads: IWorkload[];  
//   error: string;
// }

// export interface IWorkloadState {
//   category: Set<string>;
//   parent_category: Map<string, string[]>;
//   subname: Map<string, string[]>;
//   viewresult: Map<string, string[]>;
//   dealwith: Map<string, IDealWithDesc[]>;
// }

export interface IDealWithDesc {
  dealwithdesc?: string;
  unit?: string;
  standard?: string;
  associate?: string;
}
