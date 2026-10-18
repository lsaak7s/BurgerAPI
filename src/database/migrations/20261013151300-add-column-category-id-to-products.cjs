/* 
=============================================================================
MIGRATION PARA ADICIONAR RELACIONAMENTO DE CATEGORIA EM PRODUTOS (add-column-category-id-to-products.cjs)
=============================================================================
Padrão da arquitetura / Migrations do Sequelize:
- up: Adiciona a coluna "category_id" (chave estrangeira) na tabela "products",
  fazendo referência à coluna "id" da tabela "category". Define ações automáticas:
  onUpdate: 'CASCADE' (se o id da categoria mudar, atualiza aqui também) e
  onDelete: 'SET NULL' (se a categoria for deletada, o produto fica sem categoria associada).
- down: Reverte a alteração desfazendo o que o up fez (remove a coluna "category_id"
  da tabela "products").
=============================================================================
*/

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('products', 'category_id', {
			type: Sequelize.INTEGER,
			references: {
				model: 'category',
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL',
		});
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.removeColumn('products', 'category_id');
	},
};