import { IQueryResponseState } from '../../api/types';
import { IHighwayPageDto } from './services/highway.dto';

export interface IHighwayItem {
  id?: number;

  CompanyName: string;

  NowRouteName: string;

  OldRouteName: string;

  RouteNumber: string;

  SectionStart: string;

  SectionEnd: string;

  SectionStartStake: string;

  SectionEndStake: string;

  SectionMileage: number;

  TotalMileage: number;

  SectionCount: number;

  UpLink: string;

  DownLink: string;

  RouteID: number;

  RouteType: number;

  ChildRouteID: string;

  CompanyID: number;
}

export type IHighwayQueryResponseState = IQueryResponseState<IHighwayPageDto>
