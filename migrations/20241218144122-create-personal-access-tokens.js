'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('personal_access_tokens', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    tokenable_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tokenable_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    abilities: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    last_used_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    expires_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
      ),
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('personal_access_tokens');
}
