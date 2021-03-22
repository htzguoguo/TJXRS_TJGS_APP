import * as loginReducer from '../features/login/reducers';
import * as settingReducer  from '../features/setting/reducers';
import * as basicReportReducer  from '../features/basic_report/reducers';
import * as loadingReducer from './loader/reducer';
import * as themeReducer from './theme/reducer';
import * as uploadFileReducer from './file/reducer';
export default Object.assign(
  {},
  loginReducer,
  loadingReducer,
  themeReducer,
  settingReducer,
  basicReportReducer,
  uploadFileReducer
);
