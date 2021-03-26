import { IPageMetaDto } from './../../../common/dto/IPageMetaDto';
import { IPageOptionsDto } from "../../../common/dto/IPageOptionsDto";
import { IHighwayItem } from '../models';

export interface IHighwayPageOptionsDto extends IPageOptionsDto {  
  CompanyName: string;
  
  RouteNumber: string;
  
  CompanyID: string;
}

export interface IHighwayPageDto {
  data: IHighwayItem[];
  meta: IPageMetaDto
}