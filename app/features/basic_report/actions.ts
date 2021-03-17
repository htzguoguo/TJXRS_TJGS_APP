import * as types from './types';

export function requestCreateBasicReport(entity) {
  return {
    type: types.CREATE_BASIC_REPORT_REQUEST,
    entity
  };
}

export function createBasicReportFailed(error: string) {
  return {
    type: types.CREATE_BASIC_REPORT_FAILED,
    error
  };
}

export function onCreateBasicReportResponse(response) {
  return {
    type: types.CREATE_BASIC_REPORT_RESPONSE,
    response,
  };
}