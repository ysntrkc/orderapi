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
      Roles.belongsToMany(models.Permissions, {
        through: 'RolePermissions',
        foreignKey: 'role_id',
        otherKey: 'permission_id'
      });
    }
  }
  Roles.init({
    name: DataTypes.STRING,
    is_removed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};