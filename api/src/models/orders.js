'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orders.belongsTo(models.Users, { foreignKey: 'user_id' });
      Orders.belongsTo(models.OrderStatuses, { foreignKey: 'status_id' });

      Orders.hasMany(models.OrderItems, { foreignKey: 'order_id' });

      Orders.belongsToMany(models.Products, {
        through: models.OrderItems,
        foreignKey: 'order_id'
      });
    }
  }
  Orders.init({
    user_id: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};