import apiRouter from '@src/routes';
import BaseRouter from '@src/routes';
import cookieParser from 'cookie-parser';
import Env from '@src/common/Env';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import logger from 'jet-logger';
import Paths from '@src/routes/common/Paths';
import { corsConfig } from './config/cors.config';
import { morganConfig } from './config/morgan.config';
import { NodeEnvs } from '@src/common/constants';
import 'express-async-errors';

const app = express();

// Basic middleware
app.use(express.json());
app.use(corsConfig);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(Paths.Base, BaseRouter);
app.use(apiRouter);

// Dev-specific middlewares
if (Env.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morganConfig);
}

// Production-specific middlewares
if (Env.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// Error handler
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  // Log errors in non-test environments
  if (Env.NodeEnv !== NodeEnvs.Test) {
    logger.err(err, true);
  }

  res.status(HttpStatusCodes.BAD_REQUEST).json({
    status: HttpStatusCodes.BAD_REQUEST,
    message: 'An error occurred.',
    error: err.message,
  });
});

export default app;
