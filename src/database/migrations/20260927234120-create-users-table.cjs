'use strict';
//SEMPRE TENHA CERTEZA
//up: aplica a mudança — cria a tabela.
//down: desfaz a mudança — remove a tabela.
const { BOOLEAN } = require('sequelize');
// Aqui criamos a tabela de usuários no banco de dados.
/**@type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('users', {
			id: {
				primaryKey: true,
				allowNull: false,
				//type de id que serar gerado
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
	// Remove a tabela users ao desfazer esta migration.
	async down(queryInterface) {
		await queryInterface.dropTable('users');
	},
};
