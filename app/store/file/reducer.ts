import createReducer from '../../lib/createReducer';
import { IUploadFileResponseState } from './model';
import * as types from './types';

import { IUploadFilesState } from './types';
const initialState: IUploadFilesState = {
  files: [],
  error: '',
};

export const uploadFileReducer = createReducer(initialState, {
  [types.UPLOAD_FILE_REQUEST](state: IUploadFilesState) {
    return {
      ...state,
    };
  },
  [types.UPLOAD_FILE_RESPONSE](
    state: IUploadFilesState,
    action: IUploadFileResponseState,
  ) {
    const file = action.response;
    return {
      error: '',
      files: [...state.files, file],
    };
  },
  [types.UPLOAD_FILE_FAILED](state: IUploadFilesState, error: string) {
    return {
      ...state,
      error,
    };
  },
  [types.UPLOAD_FILE_DELETE](state: IUploadFilesState, action: IUploadFileResponseState,) {
    console.log(action);
    const file = action.response;
    const files = state.files;
    const idx = files.findIndex(item => item.name === file.name)
    if(idx > -1) {
      files.splice(idx, 1)
    }
    
    return {
      error: '',
      files: [...files.splice(idx, 1)]
    };
  },
});
