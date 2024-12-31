/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHttpResponse } from '@src/common/HttpResponse';
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
  controller: (...payload: any[]) => Promise<IHttpResponse>;
  policies?: ((payload: T) => Promise<boolean> | boolean)[];
  onError?: (error: Error, req: Request, res: Response) => void;
}

export const createRoute = (router: Router, options: RouteOptions): void => {
  const { path, method, middlewares = [], controller, policies = [] } = options;

  router[method](
    path,
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const payload = {
          headers: req.headers,
          body: req.body,
          params: req.params,
          query: req.query,
        };

        for (const policy of policies) {
          const isAuthorized = await policy(payload.body);
          if (!isAuthorized) {
            res.status(403).json({
              status: 403,
              message: 'Access denied',
            });
            return;
          }
        }

        // สร้าง arguments สำหรับ controller ตามจำนวนพารามิเตอร์ที่ต้องการ
        const controllerArgs: any[] = [];
        if (controller.length >= 1) controllerArgs.push(payload.headers);
        if (controller.length >= 2) controllerArgs.push(payload.body);

        const result = await controller(...controllerArgs);

        res.status(result.status || 200).json({
          status: result.status || 200,
          message: result.message || 'Success',
          data: result.data || null,
          errors: result.errors || null,
        });
      } catch (error) {
        return next(error);
      }
    },
  );
};
