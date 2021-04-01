/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { AxiosResponse } from 'axios';
import { put, call, select } from 'redux-saga/effects';

import { Alert } from 'react-native';
import { createBasicReport, updateBasicReport } from '../service';
import * as reportActions from '../actions';
import * as loaderActions from '../../../store/loader/actions';

export function* createBasicReportAsync(action) {
  yield put(loaderActions.enableLoader());
  //how to call api
  const originalFiles = action.entity.files.map((item) => ({ ...item }));
  const files = action.entity.files.map((item) => ({ ...item, base64: '' }));
  action.entity.files = files;

  const result = yield call(createBasicReport, action.entity);

  if (result.response && result.response.status === 201) {
    action.entity.files = originalFiles;
    yield put(
      reportActions.onCreateBasicReportResponse(
        action.entity,
        result.response.data,
      ),
    );
    yield put(loaderActions.disableLoader());
    Alert.alert('提示：', '上报成功', [
      {
        text: '关闭',
        style: 'cancel',
      },
    ]);
    // no need to call navigate as this is handled by redux store with SwitchNavigator
    //yield call(navigationActions.navigateToHome);
  } else {
    yield put(reportActions.createBasicReportFailed(result.error.data.error));
    yield put(loaderActions.disableLoader());   
    Alert.alert('提示：', result.error.data.error, [
      {
        text: '关闭',
        style: 'cancel',
      },
    ]);
  }
}

export function* updateBasicReportAsync(action) {
  yield put(loaderActions.enableLoader());
  //how to call api
  const originalFiles = action.entity.files.map((item) => ({ ...item }));
  const files = action.entity.files.map((item) => ({ ...item, base64: '' }));
  action.entity.files = files;

  const result = yield call(updateBasicReport, action.entity);

  if (result.response && result.response.status === 200) {
    action.entity.files = originalFiles;
    yield put(
      reportActions.onUpdateBasicReportResponse(
        action.entity,
        result.response.data,
      ),
    );
    yield put(loaderActions.disableLoader());
    Alert.alert('提示：', `编号[${action.entity.caseid}]修改成功`, [
      {
        text: '关闭',
        style: 'cancel',
      },
    ]);
    // no need to call navigate as this is handled by redux store with SwitchNavigator
    //yield call(navigationActions.navigateToHome);
  } else {
    yield put(reportActions.UpdateBasicReportFailed(result.error.data.error));
    yield put(loaderActions.disableLoader());   
    Alert.alert('提示：', result.error.data.error, [
      {
        text: '关闭',
        style: 'cancel',
      },
    ]);
  }
}
