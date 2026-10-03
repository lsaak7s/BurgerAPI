//SEMPRE TENHA CERTEZA
/*
import { Sequelize } from 'sequelize';
import { initProduct } from '../app/models/produts.ts';
import User from '../app/models/User.js';
import databaseConfig from '../config/database.cjs';

User.init(this.connection);
initProduct(this.connection);

class Database {
	constructor() {
		this.init();
	}
	init() {
		this.connection = new Sequelize(databaseConfig);
		models.map((model) => model.init(this.connection));
	}
}

export default new Database();*/
import { Sequelize } from 'sequelize';
import { initProduct } from '../app/models/produts.ts';
import User from '../app/models/User.js';
import databaseConfig from '../config/database.cjs';

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);
		User.init(this.connection);
		initProduct(this.connection);
	}
}

export default new Database();