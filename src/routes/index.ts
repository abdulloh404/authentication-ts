import { Router } from 'express';
import Paths from './common/Paths';
import authRrouter from '@route/auth/auth.route';

// Init Routes
const apiRouter = Router();

apiRouter.use(Paths.Base, authRrouter);

export default apiRouter;
