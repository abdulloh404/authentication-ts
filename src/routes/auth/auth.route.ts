import AuthController from '@src/controller/auth/auth.controller';
import Paths from '../common/Paths';
import { async } from '@src/handler/async.handler';
import { Router } from 'express';

const authRrouter: Router = Router();

authRrouter.post(Paths.Auth.register, async(AuthController.register));

export default authRrouter;
