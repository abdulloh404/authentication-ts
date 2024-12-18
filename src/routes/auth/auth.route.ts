import AuthController from '@src/controller/auth/auth.controller';
import AuthResolver from '@src/resolvers/auth/auth.resolver';
import Paths from '../common/Paths';
import { NextFunction, Request, Response, Router } from 'express';

const authRrouter = Router();

authRrouter.post(
  Paths.Auth.register,
  AuthResolver.middleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { payload, dataRequest } = res.locals.payloadData as {
        payload: any;
        dataRequest: any;
      };
      const response = await AuthController.register(payload, dataRequest);
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
