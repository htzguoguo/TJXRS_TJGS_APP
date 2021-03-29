/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import {AxiosResponse} from "axios";
import { put, call, select } from 'redux-saga/effects';

import { Alert } from 'react-native';
import {createBasicReport} from '../service';
import * as reportActions from '../actions';
import * as loaderActions from '../../../store/loader/actions';
  
export default function* createBasicReportAsync(action) {
  yield put(loaderActions.enableLoader());
  //how to call api

 
  const result  = yield call(createBasicReport, action.entity);
     
 
  if (result.response && result.response.status === 201) {
    yield put(reportActions.onCreateBasicReportResponse(result.response.data));
    yield put(loaderActions.disableLoader());

 Alert.alert('提示：', '上报成功', [{
      text: '关闭',      
      style: 'cancel'
    },]);
    // no need to call navigate as this is handled by redux store with SwitchNavigator
    //yield call(navigationActions.navigateToHome);
  } else {
    yield put(reportActions.createBasicReportFailed(result.error.data.error));
    yield put(loaderActions.disableLoader());
    // Toast.show({
    //   text: result.error.data.error,
    //   buttonText: "关闭",
    //   duration: 3000,
    //   type: "warning"
    // }) 
    Alert.alert('提示：', result.error.data.error, [{
      text: '关闭',      
      style: 'cancel'
    },]);
    // setTimeout(() => {
    //   Alert.alert('提示：', result.error.data.error);
    // }, 200);
  }
}
