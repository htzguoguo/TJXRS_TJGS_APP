import { IStoreState } from '../types';
import { IUploadFileSuccessResponse } from './model';

export const tempImagesSelector = (
  state: IStoreState,
): IUploadFileSuccessResponse[] =>
  state.uploadFileReducer.files.filter(
    (file) =>
      file && file.savedName && file.type && file.type.startsWith('image'),
  );

export const tempFilesSelector = (
  state: IStoreState,
): IUploadFileSuccessResponse[] =>
  state.uploadFileReducer.files.filter((file) => file && file.savedName);
