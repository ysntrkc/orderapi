'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.addColumn('Users', 'refresh_token', {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},

	async down (queryInterface, _Sequelize) {
		await queryInterface.removeColumn('Users', 'refresh_token');
	},
};
