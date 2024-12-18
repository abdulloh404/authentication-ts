export interface IHttpResponse {
  status: number;
  response: string;
  message: string;
  details: string;
}

export interface Request {
  locals: {
    payload: any;
    dataRequest: any;
  };
}
