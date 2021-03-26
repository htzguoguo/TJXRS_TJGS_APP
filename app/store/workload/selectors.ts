import { createSelector } from 'reselect';
import { IStoreState } from '../types';
import { WorkloadFactory } from './workloadFactory';

export const workloadSelector = (state: IStoreState) => new  WorkloadFactory(state.workloadReducer.workloads);



 