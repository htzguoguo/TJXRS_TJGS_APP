import { IWorkload } from './models';
export const WORKLOAD_QUERY_REQUEST = 'WORKLOAD_QUERY_REQUEST';
export const WORKLOAD_QUERY_RESPONSE = 'WORKLOAD_QUERY_RESPONSE';
export const WORKLOAD_FAILED = 'WORKLOAD_FAILED';

export interface ISettingState {
  workloads: IWorkloadState;  
  workloads_count: number;
  error: string;
}



export interface IWorkloadState {
  category: string[];
  parent_category: {};
  subname: {};
  viewresult: {};
  dealwith: {};
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
