
import { IHighwayPageDto } from './services/highway.dto';
import * as types from './types';

export function requestQueryHighway() {
  return {
    type: types.HIGHWAY_QUERY_REQUEST,    
  };
}

export function queryHighwayFailed(error: string) {
  return {
    type: types.HIGHWAY_QUERY_FAILED,
    error
  };
}

export function onQueryHighwayResponse(response: IHighwayPageDto) {
  return {
    type: types.HIGHWAY_QUERY_RESPONSE,
    response,
  };
}