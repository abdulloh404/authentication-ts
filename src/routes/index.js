"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("./auth/auth");
var router = (0, express_1.Router)();
router.use('/auth', auth_1.default);
exports.default = router;
