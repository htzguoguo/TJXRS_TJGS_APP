/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import {AxiosResponse} from "axios";
import { put, call, select } from 'redux-saga/effects';

import { Alert } from 'react-native';
import {loginUser} from '../service';
import * as loginActions from '../actions';
import * as loaderActions from '../../../store/loader/actions';
import { ILoginSagaCallResponse } from "./types";

// Our worker Saga that logins the user
export default function* loginAsync(action) {
  yield put(loaderActions.enableLoader());
  //how to call api
  const result: ILoginSagaCallResponse = yield call(loginUser, action.username, action.password);
 
  if (result.response && result.response.status === 200) {
    yield put(loginActions.onLoginResponse(result.response.data));
    yield put(loaderActions.disableLoader());

    // no need to call navigate as this is handled by redux store with SwitchNavigator
    //yield call(navigationActions.navigateToHome);
  } else {
    yield put(loginActions.loginFailed(result.error.data.error));
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
