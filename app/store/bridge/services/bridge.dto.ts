import { IPageMetaDto } from './../../../common/dto/IPageMetaDto';
import { IPageOptionsDto } from "../../../common/dto/IPageOptionsDto";
import { IBridgeSubNameItem } from '../models';

export interface IBridgePageOptionsDto extends IPageOptionsDto {  
  ParentCatalogName: string;
  
  StateRange: string;
  
  SubName: string;

  CompanyId: string;
}

export interface IBridgePageDto {
  data: IBridgeSubNameItem[];
  meta: IPageMetaDto
}