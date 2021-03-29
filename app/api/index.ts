import axios from 'axios';
import { Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { IUploadFile } from '../store/file/model';
import { getAuthString } from '../utils/authUtils';
import ApiConstants from './ApiConstants';
const apiClient = axios.create({
  baseURL: ApiConstants.API_BASE_URL,
});

// Set the auth token for any request
apiClient.interceptors.request.use(async (config) => {  
  if (!config.headers.Authorization) {
    const accessToken = await getAuthString();
    config.headers.Authorization = accessToken;
  } 
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
    } else {
      if (401 === error.response.status) {
        Alert.alert('提示：', '认证已过期，请重新登录。', [
          {
            text: '关闭',
            style: 'cancel',
          },
        ]);
      }
    }
    return Promise.reject(error.response);
  },
);

export async function RNFetchUploadFile(path, entity: IUploadFile) {
  const accessToken = await getAuthString();   
  return RNFetchBlob.fetch(
    'POST',
    `${ApiConstants.API_BASE_URL}${path}`,
    {
      'Content-Type': 'multipart/form-data',
      'Authorization': accessToken!,
    },
    [
      // part file from storage
      {
        name: 'file',
        filename: entity.name,
        type: entity.type,  
        size: entity.size,      
        data: RNFetchBlob.wrap(entity.uri)
      },     
    ],
  ).then((resp) => {    
    return resp.json();
  })
  .catch((error) => {
    
    if (!error.response) {
      // network error
      error.response = {
        data: {
          code: 'bf-600',
          error: '无法连接到服务器',
          context: {},
        },
      };
    } else {
      if (401 === error.response.statusCode) {
        Alert.alert('提示：', '认证已过期，请重新登录。', [
          {
            text: '关闭',
            style: 'cancel',
          },
        ]);
      }
    }
    return Promise.reject(error.response);
  });
}

 

export async function Api(path, data, method, type) {
  let options;
  const accessToken = await getAuthString();
  options = {
    headers: {
      Accept: 'application/json', 
      'Content-Type': type,   
      Authorization: accessToken,
    },
    method: method,
    body: data,
  };
  
  return await fetch(ApiConstants.API_BASE_URL + path, options)
    .then((resp) => {
     
      return resp.json();
    })
    .catch((error) => {
     
    });
}

export { apiClient };
