import HttpStatusCodes from './HttpStatusCodes';

export interface IHttpResponse {
  status: HttpStatusCodes;
  message: string;
  response?: any;
  errors?: any[];
}
