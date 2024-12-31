import AuthController from '@src/controller/auth/auth.controller';
import Paths from '../common/Paths';
import { Router } from 'express';
import { route } from '@src/handler/route.handler';

const authRouter: Router = Router();

route(authRouter, {
  path: Paths.Auth.register,
  method: 'post',
  controller: AuthController.register,
  middlewares: [],
});

export default authRouter;
