'use strict';
const {
	Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class RolePermissions extends Model {

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(_models) {
			// define association here
		}

	}
	RolePermissions.init({
		role_id: DataTypes.INTEGER,
		permission_id: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: 'RolePermissions',
	});
	return RolePermissions;
};
