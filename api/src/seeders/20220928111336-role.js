'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, _Sequelize) {
		await queryInterface.bulkInsert('Roles', [
			{
				name: 'Super Admin',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Admin',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'User',
				createdAt: new Date(),
				updatedAt: new Date(),
			} ], {});
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.bulkDelete('Roles', null, {});
	},
};
