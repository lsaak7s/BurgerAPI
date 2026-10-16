//SEMPRE TENHA CERTEZA
import { Sequelize } from 'sequelize';
import { initCategory } from '../app/models/category.js';
import Product from '../app/models/produts.js';
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

		modelInitializers.forEach((initializeModel) => {
			initializeModel(this.connection);
		});
		modelInitializers.forEach((model) => {
			if (model.associate) {
				model.associate(this.connection.models);
			}
		});
		modelInitializers.forEach((model) => {
			if (model.associate) {
				model.associate(this.connection.models);
			}
		});

		// DEBUG temporário
		console.log('Models:', Object.keys(this.connection.models));
		console.log('Associations Product:', Object.keys(Product.associations));
	}
}

export default new Database();
