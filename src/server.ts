import BaseRouter from '@src/routes';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import Env from '@src/common/Env';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
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
app.use(Paths.Base, BaseRouter);
app.use(csrf({ cookie: true }));
app.use(express.urlencoded({ extended: true }));

// Dev-specific middlewares
if (Env.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morganConfig);
}

// Production-specific middlewares
if (Env.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// Error handler
app.use((err: Error, _req: Request, res: Response) => {
  // if (Env.NodeEnv !== NodeEnvs.Test) {
  //   logger.err(err, true);
  // }
  const status = HttpStatusCodes.BAD_REQUEST;
  res.status(status).json({
    error: err.message,
  });
});

export default app;
