export interface IUploadFile {
  uri: string;
  type: string;
  name: string;
  base64?: string;
  size: number;
}

export interface IUploadFileSuccessResponse extends IUploadFile {
  "savedName": string; 
}

export interface IUploadFileResponseState {
  type: String;
  response: IUploadFileSuccessResponse;
}

