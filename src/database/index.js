/* 
=============================================================================
CONFIGURAÇÃO E CONEXÃO DO BANCO DE DADOS (src/database/index.js)
=============================================================================
Padrão da arquitetura / Database Layer:
- Estabelece a conexão com o banco de dados PostgreSQL usando o Sequelize.
- Inicializa todos os models da aplicação (User, Product, Category) repassando
  a instância da conexão ativa.
- Executa as associações/relacionamentos entre os models registrados (associate).
- Exporta uma instância única (Singleton) da classe Database.
=============================================================================
*/

import { Sequelize } from 'sequelize';
import { initCategory } from '../app/models/category.js';
import { initProduct } from '../app/models/product.js';
import { initUser } from '../app/models/User.js';

import databaseConfig from '../config/database.cjs';

const modelInitializers = [initUser, initProduct, initCategory];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);

		const models = modelInitializers.map((initializeModel) =>
			initializeModel(this.connection),
		);

		models.forEach((model) => {
			if (model && typeof model.associate === 'function') {
				model.associate(this.connection.models);
			}
		});
	}
}

export default new Database();
