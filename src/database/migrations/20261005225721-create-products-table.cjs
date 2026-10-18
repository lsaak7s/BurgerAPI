/* 
=============================================================================
MIGRATION DE CRIAÇÃO DA TABELA DE PRODUTOS (create-products-table.cjs)
=============================================================================
Padrão da arquitetura / Migrations do Sequelize:
- up: Executa a criação da tabela "products" com identificador autoincrementável
  (INTEGER), name, price, category_id, path (caminho da imagem) e timestamps.
- down: Reverte a alteração desfazendo o que o up fez (remove a tabela "products").
=============================================================================
*/

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('products', {
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
			category_id: {
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