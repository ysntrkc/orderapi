'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, _Sequelize) {
		await queryInterface.bulkInsert('UserRoles', [ {
			user_id: 1,
			role_id: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		} ], {});
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.bulkDelete('UserRoles', null, {});
	},
};
