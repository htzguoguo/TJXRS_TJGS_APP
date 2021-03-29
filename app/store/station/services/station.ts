import { AxiosResponse } from 'axios';
import { apiClient } from '../../../api';
import { IServerResponseFailure } from '../../../api/types';
import { buildSearchParamsUrl } from '../../../utils/searchUtils';
import { IStationPageDto } from './station.dto';

 

const PREFIX: string = 'station';

export function queryStation() {
  const url = buildSearchParamsUrl(PREFIX, {take: 9999});
  return apiClient
    .get(url)
    .then((response: AxiosResponse<IStationPageDto>) => ({ response }))
    .catch((error: AxiosResponse<IServerResponseFailure>) => ({ error }));
}

