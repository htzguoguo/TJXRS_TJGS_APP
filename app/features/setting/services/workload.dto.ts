import { IPageMetaDto } from './../../../common/dto/IPageMetaDto';
import { IPageOptionsDto } from "../../../common/dto/IPageOptionsDto";
import { IWorkload } from '../models';

export interface IWorkloadPageOptionsDto extends IPageOptionsDto {  
  CaseCatalog: string;
  
  ParentCatalogName: string;
  
  SubName: string;
}

export interface IWorkloadPageDto {
  data: IWorkload[];
  meta: IPageMetaDto
}