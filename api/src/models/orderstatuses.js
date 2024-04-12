'use strict';
const {
	Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class OrderStatuses extends Model {

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			OrderStatuses.hasMany(models.Orders, { foreignKey: 'status_id' });
		}

	}
	OrderStatuses.init({
		name: DataTypes.STRING,
		is_removed: DataTypes.BOOLEAN,
	}, {
		sequelize,
		modelName: 'OrderStatuses',
	});
	return OrderStatuses;
};
