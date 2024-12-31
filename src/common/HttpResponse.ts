/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatusCodes from './HttpStatusCodes';

export interface IHttpResponse {
  status: HttpStatusCodes;
  message: string;
  data?: any;
  errors?: any;
}
