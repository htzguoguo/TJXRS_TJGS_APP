 
import * as types from './types';

import { IDealWithDesc, IWorkloadState } from './types';
import { IWorkloadItem, IWorkloadQueryResponseState } from './models';
 
import createReducer from '../../lib/createReducer';

// const initialState: ISettingState = {
//   workloads: [],
//   error: '',
// };
const initialState: IWorkloadState = {
  workloads: {
    category: [],
    parent_category: {},
    subname: {},
    viewresult: {},
    dealwith: {},
  },
  workloads_count: 0,
  error: '',
};

export const workloadReducer = createReducer(initialState, {
  [types.WORKLOAD_QUERY_REQUEST](state: IWorkloadState) {
    return {
      ...state,
    };
  },
  [types.WORKLOAD_QUERY_RESPONSE](
    state: IWorkloadState,
    action: IWorkloadQueryResponseState,
  ) {
    console.log('WORKLOAD_QUERY_RESPONSE', action.response.data);
    const parsed = parseWorkload(action.response.data);
    return {
      ...state,
      error: '',
      workloads: parsed,
      workloads_count: action.response.data.length,
    };
  },
  [types.WORKLOAD_FAILED](state: IWorkloadState, error: string) {
    return {
      ...state,
      error,
    };
  },
});

const parseWorkload = (workloads: IWorkloadItem[]) => {
  const category: string[] = [];
  const parent_category = new Object();
  const subname = new Object();
  const viewresult = new Object();
  const dealwith = new Object();
  try {
    for (let i = 0; i < workloads.length; i++) {
      const w = workloads[i];
      addUniqueValueToArray(category, w.CaseCatalog) 
      addUniqueValueToObject(parent_category, w.ParentCatalogName, w.CaseCatalog)    
      addUniqueValueToObject(subname, w.SubName,  `${w.CaseCatalog}-${w.ParentCatalogName}`)  
      addUniqueValueToObject(viewresult, w.ViewResult,   `${w.CaseCatalog}-${w.ParentCatalogName}-${w.SubName}`)  
      addValueToObject(dealwith,  w,  `${w.CaseCatalog}-${w.ParentCatalogName}-${w.SubName}-${w.ViewResult}`)  
      
    }
  } catch (ex) {
    console.log(ex);
  }

  return {
    category,
    parent_category,
    subname,
    viewresult,
    dealwith,
  };
};

const addUniqueValueToObject = (obj: Object, value: string, key: string) => {
  if(obj.hasOwnProperty(key)) {
    const arr: string[] = obj[key];
    addUniqueValueToArray(arr, value)    
  }else {
    obj[key] = [value]
  }
}

const addValueToObject = (obj: Object, value: Object, key: string) => {
  if(obj.hasOwnProperty(key)) {
    const arr: Object[] = obj[key];
    arr.push(value);  
  }else {
    obj[key] = [value]
  }
}

const addUniqueValueToArray = (col: string[], value: string) => {
  if(!col.includes(value)){
    col.push(value)
  }
}

function addDealWith(
  key: string,
  value: IWorkloadItem,
  col: Map<string, IDealWithDesc[]>,
) {
  const obj: IDealWithDesc = {
    dealwithdesc: value.DealWithDesc,
    unit: value.MonitoringUnit,
    standard: value.RegistStandard,
    associate: value.AssociateUsersID,
  };
  addItemToMap(key, obj, col);
}

function addItemToMap<T>(key: string, value: T, col: Map<string, T[]>) {
  if (col.has(key)) {
    col.get(key)?.push(value);
  } else {
    col.set(key, [value]);
  }
}


