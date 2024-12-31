/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Router,
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';

interface RouteOptions<T = Record<string, any>> {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  middlewares?: RequestHandler[];
  controller: (payload: T) => Promise<{
    status: number;
    message: string;
    data?: any;
    errors?: any;
  }>;
  policies?: ((payload: T) => Promise<boolean> | boolean)[];
  onError?: (error: Error, req: Request, res: Response) => void;
}

export const createRoute = <T = Record<string, any>>(
  router: Router,
  options: RouteOptions<T>,
): void => {
  const {
    path,
    method,
    middlewares = [],
    controller,
    policies = [],
    onError,
  } = options;

  router[method](
    path,
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        // Combine Payload
        const payload: T = {
          ...req.body,
          ...req.params,
          ...req.query,
          ...req.headers,
        } as T;

        // Check Policies
        for (const policy of policies) {
          const isAuthorized = await policy(payload);
          if (!isAuthorized) {
            res.status(403).json({
              status: 403,
              message: 'Access denied',
            });
            return;
          }
        }

        // Execute Controller
        const result = await controller(payload);

        // Send Response
        res.status(result.status).json({
          status: result.status,
          message: result.message,
          data: result.data || null,
          errors: result.errors || null,
        });
        return;
      } catch (error: unknown) {
        if (onError) {
          onError(error as Error, req, res);
          return;
        }
        next(error);
      }
    },
  );
};
