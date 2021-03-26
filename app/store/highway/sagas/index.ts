import { takeEvery } from 'redux-saga/effects';
import * as types from '../types';
import highwayQueryAsync from './highwaySaga';

export const highwaySagas = [takeEvery(types.HIGHWAY_QUERY_REQUEST, highwayQueryAsync)];