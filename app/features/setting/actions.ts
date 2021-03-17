import { IWorkloadPageDto } from './services/workload.dto';
import * as types from './types';

export function requestQueryWorkloads() {
  return {
    type: types.WORKLOAD_QUERY_REQUEST,    
  };
}

export function queryWorkloadsFailed(error: string) {
  return {
    type: types.WORKLOAD_FAILED,
    error
  };
}

export function onQueryWorkloadsResponse(response: IWorkloadPageDto) {
  return {
    type: types.WORKLOAD_QUERY_RESPONSE,
    response,
  };
}