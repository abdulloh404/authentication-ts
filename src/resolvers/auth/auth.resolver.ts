import { Request, Response } from 'express';
import { registerUser } from '@src/services/auth/auth.service';
import { validateUserResponse } from '@src/schema';

export const registerResolver = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const user = await registerUser(username, email, password);
    const { error: responseError } = validateUserResponse(user.toJSON());
    if (responseError) {
      res.status(500).json({ error: 'Response validation failed' });
      return;
    }

    // Send Response
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
