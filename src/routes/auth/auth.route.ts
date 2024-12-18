import AuthController from '@src/controller/auth/auth.controller';
import AuthResolver from '@src/resolvers/auth/auth.resolver';
import Paths from '../common/Paths';
import { NextFunction, Request, Response, Router } from 'express';

const authRrouter = Router();

authRrouter.post(
  Paths.Auth.register,
  AuthResolver.middleware,
  async (_req: unknown, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { requestBody, requestData } = res.locals.data;
      const response = await AuthController.register(requestBody, requestData);

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  },
);

authRrouter.post(
  Paths.Auth.login,
  AuthResolver.middleware,
  AuthController.login,
);

export default authRrouter;
