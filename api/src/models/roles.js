'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Roles.belongsToMany(models.Permissions, { through: 'RolePermissions', foreignKey: 'role_id', otherKey: 'permission_id' });
      // Roles.belongsToMany(models.Users, { through: 'UserRoles', foreignKey: 'role_id', otherKey: 'user_id' });
    }
  }
  Roles.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};