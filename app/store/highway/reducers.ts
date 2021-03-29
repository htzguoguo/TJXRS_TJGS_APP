import * as types from './types';

import { IHighwayState } from './types';
import { IHighwayItem, IHighwayQueryResponseState } from './models';

import createReducer from '../../lib/createReducer';
import { addUniqueValueToObject } from '../../utils/objectUtilis';

// const initialState: ISettingState = {
//   workloads: [],
//   error: '',
// };
const initialState: IHighwayState = {
  highway: {
    num_names:{},   
    name_direction: {},    
  },
  highway_count: 0,
  error: '',
};

export const highwayReducer = createReducer(initialState, {
  [types.HIGHWAY_QUERY_REQUEST](state: IHighwayState) {
    return {
      ...state,
    };
  },
  [types.HIGHWAY_QUERY_RESPONSE](
    state: IHighwayState,
    action: IHighwayQueryResponseState,
  ) {
 
    const parsed = parseWorkload(action.response.data);
    return {
      ...state,
      error: '',
      highway: parsed,
      highway_count: action.response.data.length,
    };
  },
  [types.HIGHWAY_QUERY_FAILED](state: IHighwayState, error: string) {
    return {
      ...state,
      error,
    };
  },
});

const parseWorkload = (highways: IHighwayItem[]) => {
  const num_names = new Object();
  const name_direction = new Object();
  try {
    for (let i = 0; i < highways.length; i++) {
      const w = highways[i];
      const name = `${w.RouteNumber}_${w.NowRouteName}${w.SectionStartStake}${w.SectionEndStake}`;
      addUniqueValueToObject(num_names, name, w.CompanyID.toString());
      addUniqueValueToObject(name_direction, w.UpLink, name);
      addUniqueValueToObject(name_direction, w.DownLink, name);
    }
  } catch (ex) {
    console.log(ex);
  }
   
  return {
    num_names,
    name_direction,    
  };
};


