import * as types from './types';

import { IBridgeSubNameState } from './types';
import { IBridgeSubNameItem, IBridgeQueryResponseState } from './models';

import createReducer from '../../lib/createReducer';
import { addUniqueValueToObject } from '../../utils/objectUtilis';

// const initialState: ISettingState = {
//   workloads: [],
//   error: '',
// };
const initialState: IBridgeSubNameState = {
  bridge: {
    num_names:{},   
    name_direction: {},    
  },
  bridge_count: 0,
  error: '',
};

export const bridgeReducer = createReducer(initialState, {
  [types.BRIDGE_QUERY_REQUEST](state: IBridgeSubNameState) {
    return {
      ...state,
    };
  },
  [types.BRIDGE_QUERY_RESPONSE](
    state: IBridgeSubNameState,
    action: IBridgeQueryResponseState,
  ) {     
    const parsed = parseWorkload(action.response.data);
    return {
      ...state,
      error: '',
      bridge: parsed,
      bridge_count: action.response.data.length,
    };
  },
  [types.BRIDGE_QUERY_FAILED](state: IBridgeSubNameState, error: string) {
    return {
      ...state,
      error,
    };
  },
});

const parseWorkload = (bridges: IBridgeSubNameItem[]) => {
  const names_range = new Object();
  const range_bridge = new Object();
  try {
    for (let i = 0; i < bridges.length; i++) {
      const w = bridges[i];
      const key = `${w.ParentCatalogName}-${w.CatalogID}`;
      addUniqueValueToObject(names_range, w.StateRange, key);
      addUniqueValueToObject(range_bridge, w.SubName, `${w.ParentCatalogName}-${w.StateRange}-${w.CatalogID}`);      
    }
  } catch (ex) {
  
  }

  return {
    names_range,
    range_bridge,    
  };
};


