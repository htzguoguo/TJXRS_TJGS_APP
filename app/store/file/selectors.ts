import { IStoreState } from '../types';
import { IUploadFile } from './model';

export const tempImagesSelector = (
  state: IStoreState,
): IUploadFile[] =>
  state.uploadFileReducer.files.filter(
    (file) =>
      file && file.savedName && file.type && file.type.startsWith('image'),
  );

export const tempFilesSelector = (
  state: IStoreState,
): IUploadFile[] =>
  state.uploadFileReducer.files.filter((file) => file && file.savedName);
