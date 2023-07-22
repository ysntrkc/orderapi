'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('RolePermissions', [
      {
        role_id: 1,
        permission_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_id: 1,
        permission_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        role_id: 1,
        permission_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_id: 1,
        permission_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        role_id: 1,
        permission_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        role_id: 1,
        permission_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        role_id: 2,
        permission_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_id: 2,
        permission_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        role_id: 2,
        permission_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        role_id: 2,
        permission_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('RolePermissions', null, {});
  }
};
