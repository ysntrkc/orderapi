'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
	class Users extends Model {

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Users.hasOne(models.Carts, { foreignKey: 'user_id' });

			Users.belongsToMany(models.Roles, {
				through: 'UserRoles',
				foreignKey: 'user_id',
				otherKey: 'role_id',
			});
		}

	}
	Users.init({
		name: DataTypes.STRING,
		surname: DataTypes.STRING,
		username: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		refresh_token: DataTypes.STRING,
		is_removed: DataTypes.BOOLEAN,
	}, {
		sequelize,
		modelName: 'Users',
	});
	return Users;
};
