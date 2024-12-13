"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestPasswordReset = exports.verifyEmail = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../../models/userModel");
const environment_1 = require("../../environments/environment");
const email_1 = require("../../utils/email");
const registerUser = async (username, email, password) => {
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const verificationToken = jsonwebtoken_1.default.sign({ email }, environment_1.config.jwtSecret, { expiresIn: '1d' });
    const user = await userModel_1.User.create({
        username,
        email,
        password: hashedPassword,
        verificationToken,
    });
    await (0, email_1.sendVerificationEmail)(user.email, verificationToken);
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (username, password) => {
    const user = await userModel_1.User.findOne({ where: { username } });
    if (!user)
        throw new Error('User not found');
    if (!user.isVerified)
        throw new Error('Email not verified');
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error('Invalid credentials');
    const token = jsonwebtoken_1.default.sign({ id: user.id }, environment_1.config.jwtSecret, { expiresIn: '1h' });
    return token;
};
exports.loginUser = loginUser;
const verifyEmail = async (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, environment_1.config.jwtSecret);
    const user = await userModel_1.User.findOne({ where: { email: decoded.email } });
    if (!user)
        throw new Error('Invalid token');
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();
    return user;
};
exports.verifyEmail = verifyEmail;
const requestPasswordReset = async (email) => {
    const user = await userModel_1.User.findOne({ where: { email } });
    if (!user)
        throw new Error('User not found');
    const resetToken = jsonwebtoken_1.default.sign({ email: user.email }, environment_1.config.jwtSecret, { expiresIn: '1h' });
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    await user.save();
    await (0, email_1.sendResetPasswordEmail)(user.email, resetToken);
    return user;
};
exports.requestPasswordReset = requestPasswordReset;
const resetPassword = async (token, newPassword) => {
    const decoded = jsonwebtoken_1.default.verify(token, environment_1.config.jwtSecret);
    const user = await userModel_1.User.findOne({ where: { email: decoded.email, resetToken: token } });
    if (!user)
        throw new Error('Invalid or expired token');
    if (user.resetTokenExpiry && user.resetTokenExpiry < new Date())
        throw new Error('Token expired');
    const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
    return user;
};
exports.resetPassword = resetPassword;
