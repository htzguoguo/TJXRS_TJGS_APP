import { AxiosResponse } from 'axios';
import { apiClient } from '../../api';
import { IServerResponseFailure } from '../../api/types';


import { ILoginSuccessResponse } from './models';

const PREFIX: string = 'auth';

export function loginUser(username: string, password: string) {
  return apiClient
    .post(`/${PREFIX}/login`, {
      username,
      password,
      grant_type: 'password',
    })
    .then((response: AxiosResponse<ILoginSuccessResponse>) => ({ response }))
    .catch((error: AxiosResponse<IServerResponseFailure>) => ({ error }));
}

