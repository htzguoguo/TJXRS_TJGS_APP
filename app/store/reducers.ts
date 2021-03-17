import * as loginReducer from '../features/login/reducers';
import * as settingReducer  from '../features/setting/reducers';
import * as basicReportReducer  from '../features/basic_report/reducers';
import * as loadingReducer from './reducers/loadingReducer';
import * as themeReducer from './reducers/themeReducer';
export default Object.assign(
  {},
  loginReducer,
  loadingReducer,
  themeReducer,
  settingReducer,
  basicReportReducer,
);
