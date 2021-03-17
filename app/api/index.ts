import axios from 'axios';
import { Alert } from 'react-native';
import { getAuthString } from '../utils/authUtils';
import ApiConstants from './ApiConstants';
const apiClient = axios.create({
  baseURL: ApiConstants.BASE_URL,
});

// Set the auth token for any request
apiClient.interceptors.request.use( async (config) => {
  console.log('before set', config);
  if (!config.headers.Authorization) {
    const accessToken = await getAuthString();
    config.headers.Authorization = accessToken;
  }
  console.log(config);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    //return response.data;
    return response;
  },
  (error) => {
    if (!error.response) {
      // network error
      error.response = {
        data: {
          code: 'bf-600',
          error: '无法连接到服务器',
          context: {},
        },
      };
    }else {
      if (401 === error.response.status) {
        Alert.alert('提示：', '认证已过期，请重新登录。', [{
          text: '关闭',      
          style: 'cancel'
        },]);
      }
    }
    return Promise.reject(error.response);
  },
);

export async function Api(path, params, method, token) {
  let options;
  options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { token: token }),
    },
    method: method,
    ...(params && { body: JSON.stringify(params) }),
  };

  return await fetch(ApiConstants.BASE_URL + path, options)
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .then((json) => json)
    .catch((error) => console.log(error));
}

export { apiClient };
