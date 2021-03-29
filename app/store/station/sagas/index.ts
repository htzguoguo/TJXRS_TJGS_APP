import { takeEvery } from 'redux-saga/effects';
import * as types from '../types';
import stationQueryAsync from './stationSaga';

export const stationSagas = [takeEvery(types.STATION_QUERY_REQUEST, stationQueryAsync)];