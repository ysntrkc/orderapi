'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, _Sequelize) {
		await queryInterface.bulkInsert('Permissions', [
			{
				name: 'create_role_and_permission',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'add_role_and_permission',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'create_product',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'update_product',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'show_orders',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'update_order_status',
				createdAt: new Date(),
				updatedAt: new Date(),
			} ], {});
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.bulkDelete('Permissions', null, {});
	},
};
