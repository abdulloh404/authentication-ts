/* eslint-disable indent */
import { HttpResponse } from '@src/common/HttpResponse';
import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IncomingHttpHeaders } from 'http';
import QueryString from 'qs';

interface AsyncHandler {
  headers: IncomingHttpHeaders;
  params: ParamsDictionary;
  query: QueryString.ParsedQs;
  ip: string | undefined;
  userAgent: string | undefined;
}

export const async =
  (handler: (requestBody: any, requestData: any) => Promise<HttpResponse>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requestBody = req.body;
      const requestData: AsyncHandler = {
        headers: req.headers,
        params: req.params,
        query: req.query,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
      };

      const response: HttpResponse = await handler(requestBody, requestData);

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
