'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.CHAR(40),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.CHAR(40),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true,
      },
      email_verifiedAt: {
        type: Sequelize.ENUM('line', 'facebook', 'gmail', 'google'),
        allowNull: true,
      },
      is_verify: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      password: {
        type: Sequelize.STRING(132),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user',
      },
      login_by: {
        type: Sequelize.ENUM('regular', 'facebook', 'line', 'google'),
        allowNull: false,
        defaultValue: 'regular',
      },
      line_id: {
        type: Sequelize.STRING(64),
        allowNull: true,
      },
      facebook_id: {
        type: Sequelize.STRING(64),
        allowNull: true,
      },
      google_id: {
        type: Sequelize.STRING(64),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS "enum_users_emailVerifiedAt";`,
    );
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS "enum_users_role";`,
    );
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS "enum_users_loginBy";`,
    );

    await queryInterface.dropTable('users');
  },
};
