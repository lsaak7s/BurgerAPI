/* 
=============================================================================
MIGRATION DE CRIAÇÃO DA TABELA DE USUÁRIOS (create-users-table.cjs)
=============================================================================
Padrão da arquitetura / Migrations do Sequelize:
- up: Executa a alteração no banco, criando a tabela "users" com suas colunas
  (id via UUID, name, email único, password_hash, admin e timestamps).
- down: Reverte a alteração desfazendo o que o up fez (remove a tabela "users").
=============================================================================
*/

'use strict';

const { BOOLEAN } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('users', {
			id: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password_hash: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			admin: {
				type: BOOLEAN,
				defaultValue: false,
			},
			created: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			update: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('users');
	},
};