'use strict';
const md5 = require('md5');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Super',
      surname: 'Admin',
      username: 'super_admin',
      email: 'admin@admin.com',
      password: md5('Pass123.'),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
