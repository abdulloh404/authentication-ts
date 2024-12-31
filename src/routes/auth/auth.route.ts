import AuthController from '@src/controller/auth/auth.controller';
import Paths from '../common/Paths';
import { Router } from 'express';
import { createRoute } from '@src/handler/route.handler';

const authRouter: Router = Router();

createRoute(authRouter, {
  path: Paths.Auth.register,
  method: 'post',
  controller: AuthController.register,
  middlewares: [],
  policies: [],
});

export default authRouter;
