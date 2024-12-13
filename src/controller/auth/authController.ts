import { Request, Response } from 'express';
import {
  registerUser,
  loginUser,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
} from './../../services/auth/authService';
import {
  validateRegister,
  validateLogin,
  validateVerify,
  validateResetPasswordRequest,
  validateResetPassword,
  validateUserResponse,
  validateTokenResponse,
} from '../../validators/auth/authValidator';

export const register = async (req: Request, res: Response) => {
  try {
    const { error: requestError } = validateRegister(req.body);
    if (requestError)
      return res.status(400).json({ error: requestError.details[0].message });

    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);

    const { error: responseError } = validateUserResponse(user.toJSON());
    if (responseError)
      return res.status(500).json({ error: 'Internal Server Error' });

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }

  return;
};

export const login = async (req: Request, res: Response) => {
  try {
    const { error: requestError } = validateLogin(req.body);
    if (requestError)
      return res.status(400).json({ error: requestError.details[0].message });

    const { username, password } = req.body;
    const token = await loginUser(username, password);

    const { error: responseError } = validateTokenResponse({ token });
    if (responseError)
      return res.status(500).json({ error: 'Internal Server Error' });

    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
  return;
};

export const verify = async (req: Request, res: Response) => {
  try {
    const { error: requestError } = validateVerify(req.body);
    if (requestError)
      return res.status(400).json({ error: requestError.details[0].message });

    const { token } = req.body;
    const user = await verifyEmail(token);

    const { error: responseError } = validateUserResponse(user.toJSON());
    if (responseError)
      return res.status(500).json({ error: 'Internal Server Error' });

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
  return;
};

export const requestResetPassword = async (req: Request, res: Response) => {
  try {
    const { error: requestError } = validateResetPasswordRequest(req.body);
    if (requestError)
      return res.status(400).json({ error: requestError.details[0].message });

    const { email } = req.body;
    await requestPasswordReset(email);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
  return;
};

export const resetUserPassword = async (req: Request, res: Response) => {
  try {
    const { error: requestError } = validateResetPassword(req.body);
    if (requestError)
      return res.status(400).json({ error: requestError.details[0].message });

    const { token, newPassword } = req.body;
    await resetPassword(token, newPassword);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
  return;
};
