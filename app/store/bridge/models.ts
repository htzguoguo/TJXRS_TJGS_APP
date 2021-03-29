import { IQueryResponseState } from '../../api/types';
import { IBridgePageDto } from './services/bridge.dto';

export interface IBridgeSubNameItem {
  id?: number;

  ParentCatalogName: string;

  StateRange: string;

  SubName: string;

  CatalogID: string;  
}

export type IBridgeQueryResponseState = IQueryResponseState<IBridgePageDto>
