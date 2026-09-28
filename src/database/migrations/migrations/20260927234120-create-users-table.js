'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		Example: await queryInterface.createTable('users', {
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
				type: Boolean,
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

	async down(queryInterface, Sequelize) {
		Example: await queryInterface.dropTable('users');
	},
};
