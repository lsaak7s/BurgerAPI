//SEMPRE TENHA CERTEZA
import { Sequelize } from 'sequelize';
import { initCategory } from '../app/models/category.js';
import { initProduct } from '../app/models/produts.js';
import { initUser } from '../app/models/User.js';

import databaseConfig from '../config/database.cjs';

const modelInitializers = [initUser, initProduct, initCategory];

class Database {
	constructor() {
		this.init();
	}
	init() {
		this.connection = new Sequelize(databaseConfig);

		// 1º: inicializa e guarda os models
		const models = modelInitializers.map((initializeModel) =>
			initializeModel(this.connection),
		);

		// 2º: chama o associate passando this.connection.models
		models.forEach((model) => {
			if (model && typeof model.associate === 'function') {
				model.associate(this.connection.models);
			}
		});
	}
}

export default new Database();
