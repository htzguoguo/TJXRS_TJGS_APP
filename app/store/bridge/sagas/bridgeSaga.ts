import { put, call, select } from 'redux-saga/effects';

import { Alert } from 'react-native';
import { queryBridge } from '../services/bridge';
import * as bridgeActions from '../actions';
import * as loaderActions from '../../../store/loader/actions';
import { IBridgeQuerySagaCallResponse } from './types';

// Our worker Saga that logins the user
export default function* bridgeQueryAsync(action) {
  yield put(loaderActions.enableLoader());
  //how to call api
  const result: IBridgeQuerySagaCallResponse = yield call(queryBridge);

  if (result.response && result.response.status === 200) {
    yield put(bridgeActions.onQueryBridgeSubNameResponse(result.response.data));
    yield put(loaderActions.disableLoader());
  } else {
    yield put(bridgeActions.queryBridgeSubNameFailed(result.error.data.error));
    yield put(loaderActions.disableLoader());
    Alert.alert('提示：', result.error.data.error, [
      {
        text: '关闭',
        style: 'cancel',
      },
    ]);
  }
}
