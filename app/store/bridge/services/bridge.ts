import { AxiosResponse } from 'axios';
import { apiClient } from '../../../api';
import { IServerResponseFailure } from '../../../api/types';
import { buildSearchParamsUrl } from '../../../utils/searchUtils';
import { IBridgePageDto } from './bridge.dto';

 

const PREFIX: string = 'bridge';

export function queryBridge() {
  const url = buildSearchParamsUrl(PREFIX, {take: 9999});
  return apiClient
    .get(url)
    .then((response: AxiosResponse<IBridgePageDto>) => ({ response }))
    .catch((error: AxiosResponse<IServerResponseFailure>) => ({ error }));
}

