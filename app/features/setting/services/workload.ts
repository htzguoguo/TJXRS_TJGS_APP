import { AxiosResponse } from 'axios';
import { apiClient } from '../../../api';
import { IServerResponseFailure } from '../../../api/types';
import { buildSearchParamsUrl } from '../../../utils/searchUtils';
import { ILoginSuccessResponse } from '../../login/models';
 

const PREFIX: string = 'workload';

export function queryWorkload() {
  const url = buildSearchParamsUrl(PREFIX, {take: 9999});
  return apiClient
    .get(url)
    .then((response: AxiosResponse<ILoginSuccessResponse>) => ({ response }))
    .catch((error: AxiosResponse<IServerResponseFailure>) => ({ error }));
}

