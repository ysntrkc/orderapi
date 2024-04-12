'use strict';
const {
	Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Permissions extends Model {

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Permissions.belongsToMany(models.Roles, {
				through: 'RolePermissions',
				foreignKey: 'permission_id',
				otherKey: 'role_id',
			});
		}

	}
	Permissions.init({
		name: DataTypes.STRING,
		is_removed: DataTypes.BOOLEAN,
	}, {
		sequelize,
		modelName: 'Permissions',
	});
	return Permissions;
};
