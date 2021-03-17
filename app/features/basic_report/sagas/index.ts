import { takeEvery } from 'redux-saga/effects';
import * as types from '../types';
import createBasicReportAsync from './reportSaga';

export const basicReportSagas = [takeEvery(types.CREATE_BASIC_REPORT_REQUEST, createBasicReportAsync)];