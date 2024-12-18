import AuthResolver from '@src/resolvers/auth/auth.resolver';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { loginUser } from './../../services/auth/auth.service';
import { Request, Response } from 'express';
import { validateRequest } from '@src/helpers/joi-validate.helper';
import {
  validateLogin,
  validateRegisterRequest,
  validateTokenResponse,
} from '@src/schema/auth/auth.schema';

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const isValid = validateRequest(validateRegisterRequest, req.body, res);
    if (!isValid) return;

    await AuthResolver.register(req, res);
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { error: requestError } = validateLogin(req.body);
      if (requestError) {
        res
          .status(HttpStatusCodes.OK)
          .json({ error: requestError.details[0].message });
        return;
      }

      const { username, password } = req.body;
      const token = await loginUser(username, password);

      const { error: responseError } = validateTokenResponse({ token });
      if (responseError) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }
}

export default new AuthController();
