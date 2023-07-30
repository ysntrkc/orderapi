'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [{
      name: 'Product 1',
      price: 50,
      stock_quantity: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Product 2',
      price: 100,
      stock_quantity: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Product 3',
      price: 150,
      stock_quantity: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
