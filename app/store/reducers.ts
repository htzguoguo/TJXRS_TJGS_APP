import * as loginReducer from '../features/login/reducers';
import * as workloadReducer  from './workload/reducers';
import * as highwayReducer  from './highway/reducers';
import * as bridgeReducer from './bridge/reducers';
import * as stationReducer from './station/reducers';
import * as basicReportReducer  from '../features/basic_report/reducers';
import * as loadingReducer from './loader/reducer';
import * as themeReducer from './theme/reducer';
import * as uploadFileReducer from './file/reducer';
export default Object.assign(
  {},
  loginReducer,
  loadingReducer,
  themeReducer,
  workloadReducer,
  basicReportReducer,
  uploadFileReducer,
  highwayReducer,
  bridgeReducer,
  stationReducer,
);
