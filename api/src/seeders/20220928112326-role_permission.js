'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, _Sequelize) {
		await queryInterface.bulkInsert('RolePermissions', [
			{
				role_id: 1,
				permission_id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				role_id: 1,
				permission_id: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			}, {
				role_id: 1,
				permission_id: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				role_id: 1,
				permission_id: 4,
				createdAt: new Date(),
				updatedAt: new Date(),
			}, {
				role_id: 1,
				permission_id: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			}, {
				role_id: 1,
				permission_id: 6,
				createdAt: new Date(),
				updatedAt: new Date(),
			}, {
				role_id: 2,
				permission_id: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				role_id: 2,
				permission_id: 4,
				createdAt: new Date(),
				updatedAt: new Date(),
			}, {
				role_id: 2,
				permission_id: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			}, {
				role_id: 2,
				permission_id: 6,
				createdAt: new Date(),
				updatedAt: new Date(),
			} ], {});
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.bulkDelete('RolePermissions', null, {});
	},
};
