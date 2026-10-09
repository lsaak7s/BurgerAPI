//SEMPRE TENHA CERTEZA
import { Sequelize } from 'sequelize';
import { initCategory } from '../app/models/category.ts';
import { initProduct } from '../app/models/produts.ts';
import User from '../app/models/User.js';
import databaseConfig from '../config/database.cjs';

const modelInitializers = [
	(sequelize) => User.init(sequelize),
	initProduct,
	initCategory,
];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);

		modelInitializers.forEach((initializeModel) => {
			initializeModel(this.connection);
		});
	}
}

export default new Database();
