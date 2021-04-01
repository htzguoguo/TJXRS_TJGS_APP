import { createSelector } from 'reselect';
import { IUploadFile } from '../../store/file/model';
import { IStoreState } from '../../store/types';
import { IWorkloadItem } from '../../store/workload/models';


// export const workloadSelector = (state: IStoreState):IWorkloadState  => parseWorkload(state.settingReducer.workloads);
export const reportSelector = (state: IStoreState)  => state.basicReportReducer.reports;






