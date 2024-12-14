"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenResponse = exports.validateUserResponse = exports.validateResetPassword = exports.validateResetPasswordRequest = exports.validateVerify = exports.validateLogin = exports.validateRegister = void 0;
var joi_1 = require("joi");
// Validate request schemas
var validateRegister = function (data) {
    var schema = joi_1.default.object({
        username: joi_1.default.string().min(3).max(30).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
    });
    return schema.validate(data);
};
exports.validateRegister = validateRegister;
var validateLogin = function (data) {
    var schema = joi_1.default.object({
        username: joi_1.default.string().min(3).max(30).required(),
        password: joi_1.default.string().min(6).required(),
    });
    return schema.validate(data);
};
exports.validateLogin = validateLogin;
var validateVerify = function (data) {
    var schema = joi_1.default.object({
        token: joi_1.default.string().required(),
    });
    return schema.validate(data);
};
exports.validateVerify = validateVerify;
var validateResetPasswordRequest = function (data) {
    var schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
    });
    return schema.validate(data);
};
exports.validateResetPasswordRequest = validateResetPasswordRequest;
var validateResetPassword = function (data) {
    var schema = joi_1.default.object({
        token: joi_1.default.string().required(),
        newPassword: joi_1.default.string().min(6).required(),
    });
    return schema.validate(data);
};
exports.validateResetPassword = validateResetPassword;
// Validate response schemas
var validateUserResponse = function (data) {
    var schema = joi_1.default.object({
        id: joi_1.default.number().required(),
        username: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        isVerified: joi_1.default.boolean().required(),
        createdAt: joi_1.default.date().required(),
        updatedAt: joi_1.default.date().required(),
    });
    return schema.validate(data);
};
exports.validateUserResponse = validateUserResponse;
var validateTokenResponse = function (data) {
    var schema = joi_1.default.object({
        token: joi_1.default.string().required(),
    });
    return schema.validate(data);
};
exports.validateTokenResponse = validateTokenResponse;
