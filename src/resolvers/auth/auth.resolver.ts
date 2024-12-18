import { promises } from 'dns';
import { NextFunction, Request, Response } from 'express';

class AuthResolver {
  async middleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const requestBody = req.body;
      const requestData = {
        headers: req.headers,
        params: req.params,
        query: req.query,
      };

      res.locals.data = { requestBody, requestData };

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthResolver();
