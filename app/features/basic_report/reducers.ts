 
import createReducer from '../../lib/createReducer';
import * as types from './types';

import {  IBasicReportState } from './types'; 
const initialState: IBasicReportState = {  
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
    return {
      ...state,
      error: '',
    };
  },
  [types.CREATE_BASIC_REPORT_FAILED](state: IBasicReportState, error: string) {
    return {
      ...state,
      error,
    };
  },
});

