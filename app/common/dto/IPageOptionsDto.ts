import { Order } from '../constants/order';

export interface IPageOptionsDto {
  order?: Order;

  page?: number;

  take?: number;

  q?: string;
}
