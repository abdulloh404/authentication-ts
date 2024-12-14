"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserPassword = exports.requestResetPassword = exports.verify = exports.login = exports.register = void 0;
var authService_1 = require("./../../services/auth/authService");
var authValidator_1 = require("../../validators/auth/authValidator");
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestError, _a, username, email, password, user, responseError, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                requestError = (0, authValidator_1.validateRegister)(req.body).error;
                if (requestError)
                    return [2 /*return*/, res.status(400).json({ error: requestError.details[0].message })];
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, authService_1.registerUser)(username, email, password)];
            case 1:
                user = _b.sent();
                responseError = (0, authValidator_1.validateUserResponse)(user.toJSON()).error;
                if (responseError)
                    return [2 /*return*/, res.status(500).json({ error: 'Internal Server Error' })];
                res.status(201).json(user);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                if (error_1 instanceof Error) {
                    res.status(400).json({ error: error_1.message });
                }
                else {
                    res.status(400).json({ error: 'An unknown error occurred' });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestError, _a, username, password, token, responseError, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                requestError = (0, authValidator_1.validateLogin)(req.body).error;
                if (requestError)
                    return [2 /*return*/, res.status(400).json({ error: requestError.details[0].message })];
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, (0, authService_1.loginUser)(username, password)];
            case 1:
                token = _b.sent();
                responseError = (0, authValidator_1.validateTokenResponse)({ token: token }).error;
                if (responseError)
                    return [2 /*return*/, res.status(500).json({ error: 'Internal Server Error' })];
                res.status(200).json({ token: token });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                if (error_2 instanceof Error) {
                    res.status(400).json({ error: error_2.message });
                }
                else {
                    res.status(400).json({ error: 'An unknown error occurred' });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var verify = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestError, token, user, responseError, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                requestError = (0, authValidator_1.validateVerify)(req.body).error;
                if (requestError)
                    return [2 /*return*/, res.status(400).json({ error: requestError.details[0].message })];
                token = req.body.token;
                return [4 /*yield*/, (0, authService_1.verifyEmail)(token)];
            case 1:
                user = _a.sent();
                responseError = (0, authValidator_1.validateUserResponse)(user.toJSON()).error;
                if (responseError)
                    return [2 /*return*/, res.status(500).json({ error: 'Internal Server Error' })];
                res.status(200).json(user);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                if (error_3 instanceof Error) {
                    res.status(400).json({ error: error_3.message });
                }
                else {
                    res.status(400).json({ error: 'An unknown error occurred' });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.verify = verify;
var requestResetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestError, email, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                requestError = (0, authValidator_1.validateResetPasswordRequest)(req.body).error;
                if (requestError)
                    return [2 /*return*/, res.status(400).json({ error: requestError.details[0].message })];
                email = req.body.email;
                return [4 /*yield*/, (0, authService_1.requestPasswordReset)(email)];
            case 1:
                _a.sent();
                res.status(200).json({ message: 'Password reset email sent' });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                if (error_4 instanceof Error) {
                    res.status(400).json({ error: error_4.message });
                }
                else {
                    res.status(400).json({ error: 'An unknown error occurred' });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.requestResetPassword = requestResetPassword;
var resetUserPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestError, _a, token, newPassword, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                requestError = (0, authValidator_1.validateResetPassword)(req.body).error;
                if (requestError)
                    return [2 /*return*/, res.status(400).json({ error: requestError.details[0].message })];
                _a = req.body, token = _a.token, newPassword = _a.newPassword;
                return [4 /*yield*/, (0, authService_1.resetPassword)(token, newPassword)];
            case 1:
                _b.sent();
                res.status(200).json({ message: 'Password reset successful' });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                if (error_5 instanceof Error) {
                    res.status(400).json({ error: error_5.message });
                }
                else {
                    res.status(400).json({ error: 'An unknown error occurred' });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.resetUserPassword = resetUserPassword;
