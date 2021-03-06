import { IUploadFile } from './model';
import * as types from './types';

export function requestUploadFile(entity: IUploadFile) {
  return {
    type: types.UPLOAD_FILE_REQUEST,
    entity
  };
}

export function uploadFileFailed(error: string) {
  return {
    type: types.UPLOAD_FILE_FAILED,
    error
  };
}

export function onUploadFileResponse(response) {
  return {
    type: types.UPLOAD_FILE_RESPONSE,
    response,
  };
}

export function deleteUploadFile(entity: IUploadFile) {
  return {
    type: types.UPLOAD_FILE_DELETE,
    response: entity
  };
}

export function emptyUploadFile() {
  return {
    type: types.EMPTY_FILE,    
  };
}

export function replaceUploadFile(entites: IUploadFile[]) {
  return {
    type: types.REPLACE_FILE,   
    response: entites 
  };
}