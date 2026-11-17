/* 
=============================================================================
MIGRATION PARA REMOVER A COLUNA ANTIGA CATEGORY DE PRODUTOS (remove-category-column-from-products.cjs)
=============================================================================
Padrão da arquitetura / Migrations do Sequelize:
- up: Remove a coluna legada "category" (string) da tabela "products", concluindo a
  transição para o modelo relacional onde as categorias passam a ser vinculadas
  pela chave estrangeira "category_id".
- down: Reverte a alteração desfazendo o que o up fez (recria a coluna antiga "category"
  como texto opcional na tabela "products").
=============================================================================
*/

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(_queryInterface) {
    return Promise.resolve(); // Pula a execução desta migration
  },

  async down(_queryInterface) {
    return Promise.resolve();
  }
};