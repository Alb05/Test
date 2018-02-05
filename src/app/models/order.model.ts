import { Data } from "@angular/router/src/config";
import { IItem } from "./item.model";

export interface IOrder {
  ORDER_ID: number,
  ORDER_DATE: Data,
  ITEMS: IItem[]
}