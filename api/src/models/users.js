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
      // Users.hasMany(models.UserRoles, { foreignKey: 'userId' });
      Users.hasOne(models.Carts, { foreignKey: 'userId' });
      Users.belongsToMany(models.Roles, { through: 'UserRoles', foreignKey: 'userId', otherKey: 'roleId' });
    }
  }
  Users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};