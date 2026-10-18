/* 
=============================================================================
MIGRATION DE CRIAÇÃO DA TABELA DE CATEGORIAS (create-category-table.cjs)
=============================================================================
Padrão da arquitetura / Migrations do Sequelize:
- up: Executa a criação da tabela "category" no banco de dados com id numérico
  autoincrementável (INTEGER), name como texto obrigatório e único, além dos
  timestamps de controle (created_at e updated_at).
- down: Reverte a alteração desfazendo o que o up fez (remove a tabela "category").
=============================================================================
*/

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('category', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
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
		await queryInterface.dropTable('category');
	},
};