import { Request, Response } from 'express';
import { registerUser, loginUser } from './../../services/auth/auth.service';
import {
  validateRegister,
  validateUserResponse,
  validateLogin,
  validateTokenResponse,
} from '@src/schema/auth/auth.schema';

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { error: requestError } = validateRegister(req.body);
      if (requestError) {
        res.status(400).json({ error: requestError.details[0].message });
        return;
      }

      const { username, email, password } = req.body;
      const user = await registerUser(username, email, password);

      const { error: responseError } = validateUserResponse(user.toJSON());
      if (responseError) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { error: requestError } = validateLogin(req.body);
      if (requestError) {
        res.status(400).json({ error: requestError.details[0].message });
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
