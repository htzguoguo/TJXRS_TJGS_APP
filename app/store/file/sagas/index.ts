import { takeEvery } from 'redux-saga/effects';
import * as types from '../types';
import createUploadFileAsync from './uploadFileSaga';

export const uploadFileSagas = [takeEvery(types.UPLOAD_FILE_REQUEST, createUploadFileAsync)];