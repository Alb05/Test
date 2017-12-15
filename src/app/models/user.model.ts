export interface IUser {
  USER_ID: number,
  USERNAME: string,
  FIRST_NAME: string,
  LAST_NAME: string,
  MAIL: string,
  PHONE: string,
  ADDRESS: string,
  CITY: string,
  POSTAL_CODE: string,
  COUNTRY: string,
  SALT: string,
  PASSWORD: string,
  CREATED_AT: Date,
  UPDATED_AT: Date,
  DELETED_AT: Date,
  DELETED: number,
  GROUP_ID: number
}
