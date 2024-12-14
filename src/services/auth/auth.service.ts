import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../../model/user.model';
import { config } from '../../environment/environment';
import { sendResetPasswordEmail, sendVerificationEmail } from '../../util/email.util';

export const registerUser = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = jwt.sign({ email }, config.jwtSecret, { expiresIn: '1d' });
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    verificationToken,
  });
  await sendVerificationEmail(user.email, verificationToken);
  return user;
};

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error('User not found');
  if (!user.isVerified) throw new Error('Email not verified');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
  return token;
};

export const verifyEmail = async (token: string) => {
  const decoded: any = jwt.verify(token, config.jwtSecret);
  const user = await User.findOne({ where: { email: decoded.email } });
  if (!user) throw new Error('Invalid token');

  user.isVerified = true;
  user.verificationToken = null;
  await user.save();
  return user;
};

export const requestPasswordReset = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const resetToken = jwt.sign({ email: user.email }, config.jwtSecret, { expiresIn: '1h' });
  user.resetToken = resetToken;
  user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
  await user.save();

  await sendResetPasswordEmail(user.email, resetToken);
  return user;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const decoded: any = jwt.verify(token, config.jwtSecret);
  const user = await User.findOne({ where: { email: decoded.email, resetToken: token } });
  if (!user) throw new Error('Invalid or expired token');
  if (user.resetTokenExpiry && user.resetTokenExpiry < new Date()) throw new Error('Token expired');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();
  return user;
};
