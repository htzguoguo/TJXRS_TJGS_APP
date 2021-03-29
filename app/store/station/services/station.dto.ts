import { IPageMetaDto } from './../../../common/dto/IPageMetaDto';
import { IPageOptionsDto } from "../../../common/dto/IPageOptionsDto";
import { ISatationSubNameItem } from '../models';

export interface IStationPageOptionsDto extends IPageOptionsDto {  
  ParentCatalogName: string;
   
}

export interface IStationPageDto {
  data: ISatationSubNameItem[];
  meta: IPageMetaDto
}