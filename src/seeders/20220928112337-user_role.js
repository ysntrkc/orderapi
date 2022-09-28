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
    await queryInterface.bulkInsert('User_Roles', [{
      userId: 1,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 4,
      roleId: 2,
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
    await queryInterface.bulkDelete('User_Roles', null, {});
  }
};
