import bodyParser from 'body-parser';
import csrf from 'csurf';
import express from 'express';
import helmet from 'helmet';
import routes from './src/routes';
import { apiLimiter } from './src/config/rate-limit.config';
import { corsConfig } from './src/config/cors.config';
import { morganConfig } from './src/config/morgan.config';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(corsConfig);
app.use(morganConfig);
app.use(bodyParser.json());
app.use(apiLimiter, routes);
app.use(csrf({ cookie: true }));

export default app;
