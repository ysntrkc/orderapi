'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, _Sequelize) {
		await queryInterface.bulkInsert('UserRoles', [ {
			user_id: 2,
			role_id: 2,
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			user_id: 3,
			role_id: 3,
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			user_id: 4,
			role_id: 3,
			createdAt: new Date(),
			updatedAt: new Date(),
		} ], {});
	},

	async down (queryInterface, _Sequelize) {
		await queryInterface.bulkDelete('UserRoles', null, {});
	},
};
