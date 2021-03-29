export const STATION_QUERY_REQUEST = 'STATION_QUERY_REQUEST';
export const STATION_QUERY_RESPONSE = 'STATION_QUERY_RESPONSE';
export const STATION_QUERY_FAILED = 'STATION_QUERY_FAILED';

export interface IStationSubNameState {
  station: IStationSubName;  
  station_count: number;
  error: string;
}



export interface IStationSubName {
  names_station: {};   
}