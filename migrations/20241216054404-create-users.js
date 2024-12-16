'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.CHAR(40),
      allowNull: false,
    },
    lastName: {
      type: Sequelize.CHAR(40),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    emailVerifiedAt: {
      type: Sequelize.ENUM('line', 'facebook', 'gmail', 'google'),
      allowNull: true,
    },
    isVerify: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: 'false',
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
    loginBy: {
      type: Sequelize.ENUM('regular', 'facebook', 'line', 'google'),
      allowNull: false,
      defaultValue: 'regular',
    },
    lineId: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    facebookId: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    googleId: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    accessToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal(
        'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
      ),
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('users');
}
