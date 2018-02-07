import { Data } from "@angular/router/src/config";

export interface IOrder {
  ORDER_ID: number,
  ORDER_DATE: Data,
  ITEMS: {
    BOOK_ID: number,
    TITLE: string,
    PRICE: number,
    QUANTITY_SOLD: number,
    QUANTITY_RETURNED: number,
    STATUS_ID: number,
    STATUS_TYPE: string
  }[]
}