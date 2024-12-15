import { Request, Response } from 'express';
import { registerUser } from '@src/services/auth/auth.service';
import { validateUserResponse } from '@src/schema';
import { HttpStatusCode } from 'axios';

class AuthResolver {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      const user = await registerUser(username, email, password);

      res.status(HttpStatusCode.Created).json(user);
    } catch (error) {
      res.status(HttpStatusCode.InternalServerError).json({
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }
}

export default new AuthResolver();
