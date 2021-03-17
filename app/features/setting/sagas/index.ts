import { takeEvery } from 'redux-saga/effects';
import * as types from '../types';
import workloadQueryAsync from './workloadSaga';

export const settingsSagas = [takeEvery(types.WORKLOAD_QUERY_REQUEST, workloadQueryAsync)];