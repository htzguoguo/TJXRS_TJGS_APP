import { IQueryResponseState } from '../../api/types';
import { IStationPageDto } from './services/station.dto';

export interface ISatationSubNameItem {
  id?: number;

  ParentCatalogName: string;

  StationName: string;

  StationType: string;

  StationNum: string;  

  Postion: string;  
}

export type IStationQueryResponseState = IQueryResponseState<IStationPageDto>
