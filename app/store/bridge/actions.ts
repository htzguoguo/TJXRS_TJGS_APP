
import { IBridgePageDto } from './services/bridge.dto';
import * as types from './types';

export function requestQueryBridgeSubName() {
  return {
    type: types.BRIDGE_QUERY_REQUEST,    
  };
}

export function queryBridgeSubNameFailed(error: string) {
  return {
    type: types.BRIDGE_QUERY_FAILED,
    error
  };
}

export function onQueryBridgeSubNameResponse(response: IBridgePageDto) {
  return {
    type: types.BRIDGE_QUERY_RESPONSE,
    response,
  };
}