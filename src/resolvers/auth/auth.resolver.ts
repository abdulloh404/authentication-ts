import { promises } from 'dns';
import { NextFunction, Request, Response } from 'express';

class AuthResolver {
  async middleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const payload = req.body;
      const dataRequest = {
        headers: req.headers,
        params: req.params,
        query: req.query,
      };
      res.locals.payloadData = { payload, dataRequest };

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthResolver();
