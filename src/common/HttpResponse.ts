import HttpStatusCodes from './HttpStatusCodes';

export interface HttpResponse {
  status: HttpStatusCodes;
  message: string;
  response?: any;
  errors?: any[];
}
