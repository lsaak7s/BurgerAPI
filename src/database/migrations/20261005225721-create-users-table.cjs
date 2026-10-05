'use strict';
/**@type {import('sequelize-cli').Migration}*/

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('products', {
			//1,2,3,4,5 sequencia numerica
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			price: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			category: {
				type: Sequelize.STRING(),
				allowNull: false,
			},
			path: {
				type: Sequelize.STRING(),
				allowNull: true,
			},
			created_at: {
				type: Sequelize.DATE(),
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE(),
				allowNull: false,
			},
		});
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.dropTable('products');
	},
};
