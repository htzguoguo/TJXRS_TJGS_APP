import * as types from './types';

import { IStationSubNameState } from './types';
import { ISatationSubNameItem, IStationQueryResponseState } from './models';

import createReducer from '../../lib/createReducer';
import { addUniqueValueToObject } from '../../utils/objectUtilis';

// const initialState: ISettingState = {
//   workloads: [],
//   error: '',
// };
const initialState: IStationSubNameState = {
  station: {
    names_station:{},
  },
  station_count: 0,
  error: '',
};

export const stationReducer = createReducer(initialState, {
  [types.STATION_QUERY_REQUEST](state: IStationSubNameState) {
    return {
      ...state,
    };
  },
  [types.STATION_QUERY_RESPONSE](
    state: IStationSubNameState,
    action: IStationQueryResponseState,
  ) {     
    const parsed = parseStation(action.response.data);
    return {
      ...state,
      error: '',
      station: parsed,
      station_count: action.response.data.length,
    };
  },
  [types.STATION_QUERY_FAILED](state: IStationSubNameState, error: string) {
    return {
      ...state,
      error,
    };
  },
});

const parseStation = (bridges: ISatationSubNameItem[]) => {
  const names_station = new Object(); 
  try {
    for (let i = 0; i < bridges.length; i++) {
      const w = bridges[i];   
      addUniqueValueToObject(names_station, w.StationName, w.ParentCatalogName);    
    }
  } catch (ex) {
    console.log(ex);
  }

  return {
    names_station    
  };
};


