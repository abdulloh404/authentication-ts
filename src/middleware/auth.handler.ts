import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token is required' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env['JWT_SECRET'] || '',
    ) as JwtPayload;

    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
      req.body.userId = decoded['id'];
      next();
    } else {
      return res.status(403).json({ error: 'Invalid token payload' });
    }
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
  return;
};
