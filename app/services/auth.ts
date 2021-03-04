import { AxiosResponse } from 'axios';
import { Api, apiClient } from '../api';
import { IServerResponseFailure } from '../api/types';
import { ILoginResponse } from '../features/login/models';

const PREFIX: string = 'auth';

export function loginUser(username: string, password: string) {
  return apiClient
    .post(`/${PREFIX}/login`, {
      username,
      password,
      grant_type: 'password',
    })
    .then((response: AxiosResponse<ILoginResponse>) => ({ response }))
    .catch((error: AxiosResponse<IServerResponseFailure>) => ({ error }));
}

export function loginUser1(username: string, password: string) {
  //return apiClient.get("");
  return Api('', null, 'get', null);
  return Api(
    PREFIX + '?username=' + username + '&password=' + password,
    null,
    'post',
    null,
  );
}
