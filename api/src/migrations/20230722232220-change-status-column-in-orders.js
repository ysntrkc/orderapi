'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'status');
    await queryInterface.addColumn('Orders', 'status_id', {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      references: {
        model: 'OrderStatuses',
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'status_id');
    await queryInterface.addColumn('Orders', 'status', {
      type: Sequelize.STRING
    });
  }
};
