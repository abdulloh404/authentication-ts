import { HttpResponse } from '@src/common/HttpResponse';
import { Request, Response, NextFunction } from 'express';

export const async =
  (
    handler: (requestBody: any, requestData: any) => Promise<HttpResponse>,
    middleware?: (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => void | Promise<void>,
  ) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (middleware) {
        await middleware(req, res, next);
      }

      const requestBody = req.body;

      const requestData = {
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
