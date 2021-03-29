/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import {AxiosResponse} from "axios";
import { put, call, select } from 'redux-saga/effects';

import { Alert } from 'react-native';
import {uploadSingleFile} from '../service';
import * as uploadFileActions from '../actions';
import * as loaderActions from '../../../store/loader/actions';
  
export default function* createUploadFileAsync(action) {
  yield put(loaderActions.enableLoader());
  //how to call api 
  const result  = yield call(uploadSingleFile, action.entity);     
 
  if (result.response && result.response.savedName) {
    yield put(uploadFileActions.onUploadFileResponse({...action.entity, ...result.response}));
    yield put(loaderActions.disableLoader());

//  Alert.alert('提示：', '上报成功', [{
//       text: '关闭',      
//       style: 'cancel'
//     },]);
    // no need to call navigate as this is handled by redux store with SwitchNavigator
    //yield call(navigationActions.navigateToHome);
  } else {
    yield put(uploadFileActions.uploadFileFailed(result.response.error));
    yield put(loaderActions.disableLoader());    
    Alert.alert('提示：', result.response.error, [{
      text: '关闭',      
      style: 'cancel'
    },]);
    // setTimeout(() => {
    //   Alert.alert('提示：', result.error.data.error);
    // }, 200);
  }
}
