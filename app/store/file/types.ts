import { IUploadFile } from "./model";

export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_RESPONSE = 'UPLOAD_FILE_RESPONSE';
export const UPLOAD_FILE_FAILED = 'UPLOAD_FILE_FAILED';
export const UPLOAD_FILE_DELETE = 'UPLOAD_FILE_DELETE';

export const REPLACE_FILE = 'REPLACE_FILE';
export const EMPTY_FILE = 'EMPTY_FILE';

export interface IUploadFilesState {
  files: IUploadFile[]; 
  error: string,
}