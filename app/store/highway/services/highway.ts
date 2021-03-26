import { AxiosResponse } from 'axios';
import { apiClient } from '../../../api';
import { IServerResponseFailure } from '../../../api/types';
import { buildSearchParamsUrl } from '../../../utils/searchUtils';
import { IHighwayPageDto } from './highway.dto';

 

const PREFIX: string = 'highway';

export function queryHighway() {
  const url = buildSearchParamsUrl(PREFIX, {take: 9999});
  return apiClient
    .get(url)
    .then((response: AxiosResponse<IHighwayPageDto>) => ({ response }))
    .catch((error: AxiosResponse<IServerResponseFailure>) => ({ error }));
}

