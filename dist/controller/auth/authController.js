"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserPassword = exports.requestResetPassword = exports.verify = exports.login = exports.register = void 0;
const authService_1 = require("./../../services/auth/authService");
const authValidator_1 = require("../../validators/auth/authValidator");
const register = async (req, res) => {
    try {
        const { error: requestError } = (0, authValidator_1.validateRegister)(req.body);
        if (requestError)
            return res.status(400).json({ error: requestError.details[0].message });
        const { username, email, password } = req.body;
        const user = await (0, authService_1.registerUser)(username, email, password);
        const { error: responseError } = (0, authValidator_1.validateUserResponse)(user.toJSON());
        if (responseError)
            return res.status(500).json({ error: 'Internal Server Error' });
        res.status(201).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
    return;
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { error: requestError } = (0, authValidator_1.validateLogin)(req.body);
        if (requestError)
            return res.status(400).json({ error: requestError.details[0].message });
        const { username, password } = req.body;
        const token = await (0, authService_1.loginUser)(username, password);
        const { error: responseError } = (0, authValidator_1.validateTokenResponse)({ token });
        if (responseError)
            return res.status(500).json({ error: 'Internal Server Error' });
        res.status(200).json({ token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
    return;
};
exports.login = login;
const verify = async (req, res) => {
    try {
        const { error: requestError } = (0, authValidator_1.validateVerify)(req.body);
        if (requestError)
            return res.status(400).json({ error: requestError.details[0].message });
        const { token } = req.body;
        const user = await (0, authService_1.verifyEmail)(token);
        const { error: responseError } = (0, authValidator_1.validateUserResponse)(user.toJSON());
        if (responseError)
            return res.status(500).json({ error: 'Internal Server Error' });
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
    return;
};
exports.verify = verify;
const requestResetPassword = async (req, res) => {
    try {
        const { error: requestError } = (0, authValidator_1.validateResetPasswordRequest)(req.body);
        if (requestError)
            return res.status(400).json({ error: requestError.details[0].message });
        const { email } = req.body;
        await (0, authService_1.requestPasswordReset)(email);
        res.status(200).json({ message: 'Password reset email sent' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
    return;
};
exports.requestResetPassword = requestResetPassword;
const resetUserPassword = async (req, res) => {
    try {
        const { error: requestError } = (0, authValidator_1.validateResetPassword)(req.body);
        if (requestError)
            return res.status(400).json({ error: requestError.details[0].message });
        const { token, newPassword } = req.body;
        await (0, authService_1.resetPassword)(token, newPassword);
        res.status(200).json({ message: 'Password reset successful' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
    return;
};
exports.resetUserPassword = resetUserPassword;
