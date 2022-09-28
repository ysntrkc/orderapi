'use strict';

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
    await queryInterface.bulkInsert('Users', [{
      username: 'janedoe',
      email: 'jane@doe.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'johndoe',
      email: 'john@doe.com',
      password: '123123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'yasin',
      email: 'yasin@gmail.com',
      password: 'qwe123',
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
    await queryInterface.bulkDelete('Users', null, {});
  }
};
