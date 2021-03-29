import { put, call, select } from 'redux-saga/effects';

import { Alert } from 'react-native';
import { queryStation } from '../services/station';
import * as stationActions from '../actions';
import * as loaderActions from '../../../store/loader/actions';
import { IStationQuerySagaCallResponse } from './types';

// Our worker Saga that logins the user
export default function* stationQueryAsync(action) {
  yield put(loaderActions.enableLoader());
  //how to call api
  const result: IStationQuerySagaCallResponse = yield call(queryStation);

  if (result.response && result.response.status === 200) {
    yield put(stationActions.onQueryStationSubNameResponse(result.response.data));
    yield put(loaderActions.disableLoader());
  } else {
    yield put(stationActions.queryStationSubNameFailed(result.error.data.error));
    yield put(loaderActions.disableLoader());
    Alert.alert('提示：', result.error.data.error, [
      {
        text: '关闭',
        style: 'cancel',
      },
    ]);
  }
}
