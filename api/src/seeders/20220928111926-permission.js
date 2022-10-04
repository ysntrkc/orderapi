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
    await queryInterface.bulkInsert('Permissions', [
      {
        description: 'create_role_and_permission',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'add_role_and_permission',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'create_product',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'update_product',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'show_orders',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'update_order_status',
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
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};
