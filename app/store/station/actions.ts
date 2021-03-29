
import { IStationPageDto } from './services/station.dto';
import * as types from './types';

export function requestQueryStationSubName() {
  return {
    type: types.STATION_QUERY_REQUEST,    
  };
}

export function queryStationSubNameFailed(error: string) {
  return {
    type: types.STATION_QUERY_FAILED,
    error
  };
}

export function onQueryStationSubNameResponse(response: IStationPageDto) {
  return {
    type: types.STATION_QUERY_RESPONSE,
    response,
  };
}