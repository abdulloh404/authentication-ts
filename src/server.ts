import BaseRouter from '@src/routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import Env from '@src/common/Env';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import logger from 'jet-logger';
import Paths from '@src/routes/common/Paths';
import routes from '@src/routes';
import { apiLimiter } from './config/rate-limit.config';
import { corsConfig } from './config/cors.config';
import { morganConfig } from './config/morgan.config';
import { NodeEnvs } from '@src/common/constants';
import { RouteError } from '@src/common/route-errors';
import 'express-async-errors';

const app = express();

// Basic middleware
app.use(express.json());
app.use(corsConfig);
app.use(bodyParser.json());
app.use(apiLimiter, routes);
app.use(cookieParser());
app.use(Paths.Base, BaseRouter);
app.use(csrf({ cookie: true }));
// app.use(express.urlencoded({ extended: true }));

// Dev-specific middlewares
if (Env.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morganConfig);
}

// Production-specific middlewares
if (Env.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// Error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (Env.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});

export default app;
