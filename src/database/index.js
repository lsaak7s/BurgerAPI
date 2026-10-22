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
import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import { initCategory } from '../app/models/Category.js';
import { initProduct } from '../app/models/Product.js';
import { initUser } from '../app/models/User.js';

import databaseConfig from '../config/database.cjs';

const modelInitializers = [initUser, initProduct, initCategory];

class Database {
	constructor() {
		this.init();
		this.mongo();
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
	mongo() {
		this.mongooseConection = mongoose.connect(
			'mongodb://localhost:27017/burguerapi',
		);
	}
}

export default new Database();
