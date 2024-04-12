'use strict';
require('dotenv').config({ path: './env/development.env' });
const md5 = require('md5');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, _Sequelize) {
		await queryInterface.bulkInsert('Users', [ {
			name: 'Super',
			surname: 'Admin',
			username: 'super_admin',
			email: 'admin@admin.com',
			password: md5(md5('Pass123.') + process.env.PASSWORD_SALT),
			createdAt: new Date(),
			updatedAt: new Date(),
		} ], {});
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.bulkDelete('Users', null, {});
	},
};
