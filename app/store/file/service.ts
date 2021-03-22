import axios, { AxiosResponse } from 'axios';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { Api, apiClient, RNFetchUploadFile } from '../../api';
import ApiConstants from '../../api/ApiConstants';
import { IServerResponseFailure } from '../../api/types';
import { IUploadFile, IUploadFileSuccessResponse } from './model';

const PREFIX: string = 'files';

export function uploadSingleFile(entity: IUploadFile) {
  const data = new FormData();
  data.append('file',{
    uri:
    Platform.OS === 'android' ? entity.uri : entity.uri.replace('file://', ''),
    type: entity.type,
    name: entity.name,    
    size: entity.size,
  });  
 
  return RNFetchUploadFile(`${PREFIX}/upload/single`, entity)
    .then((response) => ({
      response,
    }))
    .catch((error: AxiosResponse<IServerResponseFailure>) => ({ error }));

  // return axios({
  //   method: 'post',
  //   url: `${ApiConstants.BASE_URL}${PREFIX}/upload/single`,
  //   data: data._parts,
  //   headers: new Headers({
  //     'Content-Type': 'multipart/form-data', //Specifying the Content-Type
  //   }),
  // })
  //   .then((response: AxiosResponse<IUploadFileSuccessResponse>) => ({
  //     response,
  //   }))
  //   .catch((error: AxiosResponse<IServerResponseFailure>) => {
  //     console.log(error);
  //   });

  return apiClient
    .post(`${PREFIX}/upload/single`, data)
    .then((response: AxiosResponse<IUploadFileSuccessResponse>) => ({
      response,
    }))
    .catch((error: AxiosResponse<IServerResponseFailure>) => ({ error }));

  // return Api(`${PREFIX}/single`, data, 'POST', entity.type)
  //   .then((response: AxiosResponse<IUploadFileSuccessResponse>) => ({
  //     response,
  //   }))
  //   .catch((error: AxiosResponse<IServerResponseFailure>) => ({ error }));
  //   console.log(`${ApiConstants.BASE_URL}${PREFIX}/single`);
  const headers = { "content-type": "multipart/form-data", "accept": "application/json" }
  return  fetch( `${ApiConstants.BASE_URL}${PREFIX}/upload/single`, {
          method: 'POST',
          headers,
          body: data ,
        })
          .then((data) => data.json())
          .then((res) => {
            console.log('upload succes', res);

          })
          .catch((error) => {
            console.log('upload error', error);
          });
}
