import { AxiosResponse } from 'axios';
import { apiClient } from '../../api';
import { IServerResponseFailure } from '../../api/types';

const PREFIX: string = 'reports';

export function createBasicReport(entity) {
  return apiClient
    .post(`/${PREFIX}`, entity)
    .then((response: AxiosResponse) => ({ response }))
    .catch((error: AxiosResponse<IServerResponseFailure>) => ({ error }));
}

export function updateBasicReport(entity) {
  return apiClient
    .put(`/${PREFIX}`, entity)
    .then((response: AxiosResponse) => ({ response }))
    .catch((error: AxiosResponse<IServerResponseFailure>) => ({ error }));
}

export function deleteBasicReport(id) {
  return apiClient
    .delete(`/${PREFIX}/${id}`)
    .then((response: AxiosResponse) => ({ response }))
    .catch((error: AxiosResponse<IServerResponseFailure>) => ({ error }));
}

