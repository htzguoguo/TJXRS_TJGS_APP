 
import createReducer from '../../lib/createReducer';
import { IReportBasicInfo } from './model';
import * as types from './types';

import {  IBasicReportState } from './types'; 
const initialState: IBasicReportState = {  
  reports: [],
  error: '',
};

export const basicReportReducer = createReducer(initialState, {
  [types.CREATE_BASIC_REPORT_REQUEST](state: IBasicReportState) {
    return {
      ...state,
    };
  },
  [types.CREATE_BASIC_REPORT_RESPONSE](
    state: IBasicReportState,
    action,
  ) {
    const entity = action.entity;
    const reports: IReportBasicInfo[] = action.response;
    
    return {
      reports: [...state.reports, {...entity, id: reports[0].id, caseId: reports[0].caseId}],
      error: '',
    };
  },
  [types.CREATE_BASIC_REPORT_FAILED](state: IBasicReportState, error: string) {
    return {
      ...state,
      error,
    };
  },
  [types.UPDATE_BASIC_REPORT_REQUEST](state: IBasicReportState) {
    return {
      ...state,
    };
  },
  [types.UPDATE_BASIC_REPORT_RESPONSE](
    state: IBasicReportState,
    action,
  ) {
    const entity = action.entity;
    const reports: IReportBasicInfo[] = action.response;
    const idx = state.reports.findIndex(item => item.caseId === entity.caseId)
    state.reports.splice(idx, 1, {...entity, id: reports[0].id, caseId: reports[0].caseId})
    return {
      reports: [...state.reports],
      error: '',
    };
  },
  [types.UPDATE_BASIC_REPORT_FAILED](state: IBasicReportState, error: string) {
    return {
      ...state,
      error,
    };
  },
});

