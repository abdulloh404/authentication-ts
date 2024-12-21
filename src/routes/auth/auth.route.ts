import AuthController from '@src/controller/auth/auth.controller';
import Paths from '../common/Paths';
import { NextFunction, Request, Response, Router } from 'express';
import { HttpResponse } from '@src/common/HttpResponse';
import { async } from '@src/handler/async.handler';

const authRrouter: Router = Router();

authRrouter.post(Paths.Auth.register, async(AuthController.register));

export default authRrouter;
