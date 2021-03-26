import { IPageMetaDto } from './../../../common/dto/IPageMetaDto';
import { IPageOptionsDto } from "../../../common/dto/IPageOptionsDto";
import { IWorkloadItem } from '../models';

export interface IWorkloadPageOptionsDto extends IPageOptionsDto {  
  CaseCatalog: string;
  
  ParentCatalogName: string;
  
  SubName: string;
}

export interface IWorkloadPageDto {
  data: IWorkloadItem[];
  meta: IPageMetaDto
}