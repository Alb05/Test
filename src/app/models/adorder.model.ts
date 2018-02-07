import { Data } from "@angular/router/src/config";

export interface IAdOrder {
  ORDER_ID: number,
  ORDER_DATE: Data,
  USER_ID: number,
  NAME: string,
  MAIL: string,
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