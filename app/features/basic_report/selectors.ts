import { createSelector } from 'reselect';
import { IStoreState } from '../../store/types';
import { IWorkload } from '../setting/models';
import { IDealWithDesc, IWorkloadState } from '../setting/types';

// export const workloadSelector = (state: IStoreState):IWorkloadState  => parseWorkload(state.settingReducer.workloads);
export const workloadSelector = (state: IStoreState):IWorkloadState  => state.settingReducer.workloads;

const parseWorkload = (workloads: IWorkload[]) => {
  const category = new Set<string>();
  const parent_category = new Map<string, string[]>();
  const subname = new Map<string, string[]>();
  const viewresult = new Map<string, string[]>();
  const dealwith = new Map<string, IDealWithDesc[]>();
  try {
    for (let i = 0; i < workloads.length; i++) {
      const w = workloads[i];
      category.add(w.CaseCatalog);
      addItemToMap(w.CaseCatalog, w.ParentCatalogName, parent_category);
      addItemToMap(
        `${w.CaseCatalog}-${w.ParentCatalogName}`,
        w.SubName,
        subname,
      );
      addItemToMap(
        `${w.CaseCatalog}-${w.ParentCatalogName}-${w.SubName}`,
        w.ViewResult,
        viewresult,
      );
      addDealWith(
        `${w.CaseCatalog}-${w.ParentCatalogName}-${w.SubName}-${w.ViewResult}`,
        w,
        dealwith,
      );
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

function addDealWith(
  key: string,
  value: IWorkload,
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







