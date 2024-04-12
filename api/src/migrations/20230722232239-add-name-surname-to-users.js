'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.addColumn('Users', 'name', {
			type: Sequelize.STRING,
			allowNull: false,
		});
		await queryInterface.addColumn('Users', 'surname', {
			type: Sequelize.STRING,
			allowNull: false,
		});
	},

	async down (queryInterface, _Sequelize) {
		await queryInterface.removeColumn('Users', 'name');
		await queryInterface.removeColumn('Users', 'surname');
	},
};
