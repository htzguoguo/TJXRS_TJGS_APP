import { put, call, select } from 'redux-saga/effects';

import { Alert } from 'react-native';
import { queryWorkload } from '../services/workload';
import * as workloadActions from '../actions';
import * as loaderActions from '../../../store/loader/actions';
import { IWorkloadQuerySagaCallResponse } from './types';

// Our worker Saga that logins the user
export default function* workloadQueryAsync(action) {
  yield put(loaderActions.enableLoader());
  //how to call api
  const result: IWorkloadQuerySagaCallResponse = yield call(queryWorkload);
 
  if (result.response && result.response.status === 200) {
    yield put(workloadActions.onQueryWorkloadsResponse(result.response.data));
    yield put(loaderActions.disableLoader());
  } else {
    yield put(workloadActions.queryWorkloadsFailed(result.error.data.error));
    yield put(loaderActions.disableLoader());
    Alert.alert('提示：', result.error.data.error, [
      {
        text: '关闭',
        style: 'cancel',
      },
    ]);
  }
}
