"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = require("../config/database.config");
class User extends sequelize_1.Model {
    id;
    username;
    email;
    password;
    isVerified;
    verificationToken;
    resetToken;
    resetTokenExpiry;
    createdAt;
    updatedAt;
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    verificationToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    resetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    resetTokenExpiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: database_config_1.sequelize,
    tableName: 'users',
});
