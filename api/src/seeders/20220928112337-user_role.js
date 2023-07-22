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
    await queryInterface.bulkInsert('UserRoles', [{
      user_id: 1,
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 2,
      role_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 3,
      role_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 4,
      role_id: 3,
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
    await queryInterface.bulkDelete('UserRoles', null, {});
  }
};
