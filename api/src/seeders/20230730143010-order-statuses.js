'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('OrderStatuses', [
      {
        name: 'Pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Completed',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderStatuses', null, {});
  }
};
