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
      // define association here
      Users.belongsToMany(models.Roles, { through: 'User_Roles', foreignKey: 'userId', otherKey: 'roleId' });
      Users.hasOne(models.Carts, { foreignKey: 'userId' });
    }
  }
  Users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};