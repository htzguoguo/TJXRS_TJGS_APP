/**
 *  Redux saga class init
 * Import every feature saga here
 *
 */
import { all } from 'redux-saga/effects';
import { loginSagas } from '../features/login/sagas';
import { workloadSagas } from './workload/sagas';
import { highwaySagas } from './highway/sagas';
import { basicReportSagas } from '../features/basic_report/sagas';
import { uploadFileSagas } from './file/sagas';

// export default [loginSaga];

export default function* rootSaga() {
  yield all([
    ...loginSagas,
    ...workloadSagas,
    ...basicReportSagas,
    ...uploadFileSagas,
    ...highwaySagas,
  ]);
}
