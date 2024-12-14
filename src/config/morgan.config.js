"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganConfig = void 0;
var morgan_1 = require("morgan");
var logger_1 = require("../utils/logger");
exports.morganConfig = (0, morgan_1.default)('combined', {
    stream: { write: function (message) { return logger_1.default.info(message.trim()); } },
});
