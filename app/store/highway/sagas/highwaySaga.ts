import { put, call, select } from 'redux-saga/effects';

import { Alert } from 'react-native';
import { queryHighway } from '../services/highway';
import * as highwayActions from '../actions';
import * as loaderActions from '../../../store/loader/actions';
import { IHighwayQuerySagaCallResponse } from './types';

// Our worker Saga that logins the user
export default function* highwayQueryAsync(action) {
  yield put(loaderActions.enableLoader());
  //how to call api
  const result: IHighwayQuerySagaCallResponse = yield call(queryHighway);

  if (result.response && result.response.status === 200) {
    yield put(highwayActions.onQueryHighwayResponse(result.response.data));
    yield put(loaderActions.disableLoader());
  } else {
    yield put(highwayActions.queryHighwayFailed(result.error.data.error));
    yield put(loaderActions.disableLoader());
    Alert.alert('提示：', result.error.data.error, [
      {
        text: '关闭',
        style: 'cancel',
      },
    ]);
  }
}
