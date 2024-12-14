import nodemailer from 'nodemailer';
import { config } from '../environment/environment';

export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: config.emailService,
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });

  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: 'Account Verification',
    text: `Please verify your account by clicking the link: \nhttp:\/\/${config.host}\/confirmation\/${token}`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: config.emailService,
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });

  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: 'Password Reset',
    text: `You requested a password reset. Click the link below to reset your password: \nhttp:\/\/${config.host}\/reset-password\/${token}`,
  };

  await transporter.sendMail(mailOptions);
};
