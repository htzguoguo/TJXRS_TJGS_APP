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

export function onCreateBasicReportResponse(entity, response) {
  return {
    type: types.CREATE_BASIC_REPORT_RESPONSE,
    entity,
    response,
  };
}

export function requestUpdateBasicReport(entity) {
  return {
    type: types.UPDATE_BASIC_REPORT_REQUEST,
    entity
  };
}

export function UpdateBasicReportFailed(error: string) {
  return {
    type: types.UPDATE_BASIC_REPORT_FAILED,
    error
  };
}

export function onUpdateBasicReportResponse(entity, response) {
  return {
    type: types.UPDATE_BASIC_REPORT_RESPONSE,
    entity,
    response,
  };
}