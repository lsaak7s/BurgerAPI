//SEMPRE TENHA CERTEZA
import { Sequelize } from 'sequelize';
import produts from '../app/models/produts.ts';
import User from '../app/models/User.js';
import databaseConfig from '../config/database.cjs';

const models = [User,produts];

class Database {
	constructor() {
		this.init();
	}
	init() {
		this.connection = new Sequelize(databaseConfig);
		models.map((model) => model.init(this.connection));
	}
}

export default new Database();
