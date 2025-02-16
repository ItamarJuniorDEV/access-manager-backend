import Sequelize from 'sequelize';
import UserManageAccess from '../app/models/UserManageAccessModel';
import User from '../app/models/UserModel';
import databaseConfig from '../config/database';

const models = [User, UserManageAccess];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);

		models
			.map(model => model.init(this.connection))
			.map(model => model.associate && model.associate(this.connection.models));
	}
}

export default new Database();
