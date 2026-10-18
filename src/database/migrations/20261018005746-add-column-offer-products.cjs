/* 
=============================================================================
MIGRATION PARA ADICIONAR COLUNA OFFER EM PRODUTOS (add-column-offer-products.cjs)
=============================================================================
Padrão da arquitetura / Migrations do Sequelize:
- up: Adiciona a coluna "offer" (booleano) na tabela "products", com valor padrão 
  false e preenchimento obrigatório (allowNull: false), servindo para identificar 
  se o produto está ou não em oferta/promoção.
- down: Reverte a alteração desfazendo o que o up fez (remove a coluna "offer" da 
  tabela "products").
=============================================================================
*/

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('products', 'offer', {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		});
	},

	async down(queryInterface) {
		await queryInterface.removeColumn('products', 'offer');
	},
};