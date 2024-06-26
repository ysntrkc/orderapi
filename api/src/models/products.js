'use strict';
const {
	Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Products extends Model {

		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(_models) {
			// define association here
		}

	}
	Products.init({
		name: DataTypes.STRING,
		price: DataTypes.FLOAT,
		stock_quantity: DataTypes.INTEGER,
		is_removed: DataTypes.BOOLEAN,
	}, {
		sequelize,
		modelName: 'Products',
	});
	return Products;
};
