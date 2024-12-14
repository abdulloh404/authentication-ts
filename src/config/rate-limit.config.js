"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = void 0;
var express_rate_limit_1 = require("express-rate-limit");
exports.apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 นาที
    max: 100, // จำกัดจำนวนคำขอ 100 ครั้งต่อ 15 นาที
});
