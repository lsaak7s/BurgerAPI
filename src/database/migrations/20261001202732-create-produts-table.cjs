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
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			price: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			path: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			created: {
				type: Sequelize.STRING(),
				allowNull: false,
			},
			update: {
				type: Sequelize.STRING(),
				allowNull: false,
			},
		});
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.dropTable('products');
	},
};
