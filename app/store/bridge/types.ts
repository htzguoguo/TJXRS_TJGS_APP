export const BRIDGE_QUERY_REQUEST = 'BRIDGE_QUERY_REQUEST';
export const BRIDGE_QUERY_RESPONSE = 'BRIDGE_QUERY_RESPONSE';
export const BRIDGE_QUERY_FAILED = 'BRIDGE_QUERY_FAILED';

export interface IBridgeSubNameState {
  bridge: IBridgeSubName;  
  bridge_count: number;
  error: string;
}



export interface IBridgeSubName {
  names_range: {};
  range_bridge: {};  
}