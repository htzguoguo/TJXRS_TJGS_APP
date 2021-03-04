import axios from 'axios';
import ApiConstants from './ApiConstants';
const apiClient = axios.create({
  baseURL: ApiConstants.BASE_URL,  
});

apiClient.interceptors.response.use(
  response => {
    //return response.data;   
    console.log('response', response); 
    return response;
  },
  error => {
    console.log('error', error);
    if (!error.response) {
      // network error
      error.response = {
        data: {
          error: {
            code: "bf-600",
            message: "无法连接到服务器",
            context: {},
          },
        },
      };      
    } 
    return Promise.reject(error.response);
  },
);

export async  function Api(path, params, method, token) {
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
    .then(resp => {console.log(resp); return resp.json()})
    .then(json => json)
    .catch(error => console.log(error));
}

export { apiClient,  };