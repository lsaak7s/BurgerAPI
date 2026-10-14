//SEMPRE TENHA CERTEZA
import { Sequelize } from 'sequelize';
import { initCategory } from '../app/models/category.ts';
import { initProduct } from '../app/models/produts.ts';
import { initUser } from '../app/models/User.js';
import databaseConfig from '../config/database.cjs';

const modelInitializers = [initUser, initProduct, initCategory];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);

		modelInitializers.forEach((initializeModel) => {
			initializeModel(this.connection);
		});
		// ✅ CERTO - com { } não retorna nada
		modelInitializers.forEach((model) => {
			if (model.associate) {
				model.associate(this.connection.models);
			}
		});
	}
}

export default new Database();
