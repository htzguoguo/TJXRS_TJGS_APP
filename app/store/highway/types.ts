export const HIGHWAY_QUERY_REQUEST = 'HIGHWAY_QUERY_REQUEST';
export const HIGHWAY_QUERY_RESPONSE = 'HIGHWAY_QUERY_RESPONSE';
export const HIGHWAY_QUERY_FAILED = 'HIGHWAY_QUERY_FAILED';

export interface IHighwayState {
  highway: IHighway;  
  highway_count: number;
  error: string;
}



export interface IHighway {
  num_names: {};
  name_direction: {};  
}