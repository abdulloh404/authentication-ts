"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const environment_1 = require("../environments/environment");
exports.sequelize = new sequelize_1.Sequelize(environment_1.config.mysql.database, environment_1.config.mysql.user, environment_1.config.mysql.password, {
    host: environment_1.config.mysql.host,
    dialect: 'mysql',
});
