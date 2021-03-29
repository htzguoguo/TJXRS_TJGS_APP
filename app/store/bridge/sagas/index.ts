import { takeEvery } from 'redux-saga/effects';
import * as types from '../types';
import bridgeQueryAsync from './bridgeSaga';

export const bridgeSagas = [takeEvery(types.BRIDGE_QUERY_REQUEST, bridgeQueryAsync)];