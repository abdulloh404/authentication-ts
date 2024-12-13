"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordEmail = exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const environment_1 = require("../environments/environment");
const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer_1.default.createTransport({
        service: environment_1.config.emailService,
        auth: {
            user: environment_1.config.emailUser,
            pass: environment_1.config.emailPass,
        },
    });
    const mailOptions = {
        from: environment_1.config.emailUser,
        to: email,
        subject: 'Account Verification',
        text: `Please verify your account by clicking the link: \nhttp:\/\/${environment_1.config.host}\/confirmation\/${token}`,
    };
    await transporter.sendMail(mailOptions);
};
exports.sendVerificationEmail = sendVerificationEmail;
const sendResetPasswordEmail = async (email, token) => {
    const transporter = nodemailer_1.default.createTransport({
        service: environment_1.config.emailService,
        auth: {
            user: environment_1.config.emailUser,
            pass: environment_1.config.emailPass,
        },
    });
    const mailOptions = {
        from: environment_1.config.emailUser,
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Click the link below to reset your password: \nhttp:\/\/${environment_1.config.host}\/reset-password\/${token}`,
    };
    await transporter.sendMail(mailOptions);
};
exports.sendResetPasswordEmail = sendResetPasswordEmail;
