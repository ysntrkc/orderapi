'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Carts.belongsTo(models.Users, { foreignKey: 'user_id' });

      Carts.belongsToMany(models.Products, {
        through: models.CartItems,
        foreignKey: 'cart_id',
        otherKey: 'product_id'
      });
    }
  }
  Carts.init({
    user_id: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    is_removed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};