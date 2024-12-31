import HttpStatusCodes from './HttpStatusCodes';

export interface IHttpResponse {
  status: HttpStatusCodes;
  message: string;
  data?: any;
  errors?: any[];
}
