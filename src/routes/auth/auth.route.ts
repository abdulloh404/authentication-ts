import AuthController from '@src/controller/auth/auth.controller';
import AuthResolver from '@src/resolvers/auth/auth.resolver';
import Paths from '../common/Paths';
import { NextFunction, Request, Response, Router } from 'express';

const authRrouter: Router = Router();

authRrouter.post(
  Paths.Auth.register,
  AuthResolver.middleware,
  async (req: unknown, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { requestBody, requestData } = res.locals.data;
      const response = await AuthController.register(requestBody, requestData);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  },
);

export default authRrouter;
