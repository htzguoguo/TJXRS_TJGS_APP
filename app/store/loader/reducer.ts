/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
 
import * as types from './types';
import { ILoading } from './model';
import createReducer from '../../lib/createReducer';

const initialState: ILoading = {
  isLoading: false,
};

export const loadingReducer = createReducer(initialState, {
  [types.ENABLE_LOADER](state: ILoading) {
    return { ...state, isLoading: true };
  },
  [types.DISABLE_LOADER](state: ILoading) {
    return { ...state, isLoading: false };
  },
});
