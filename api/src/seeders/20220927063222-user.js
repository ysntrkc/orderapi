'use strict';
require('dotenv').config({ path: './env/development.env' });
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, _Sequelize) {
		await queryInterface.bulkInsert('Users', [ {
			name: 'Super',
			surname: 'Admin',
			username: 'super_admin',
			email: 'admin@admin.com',
			password: bcrypt.hashSync('Pass123.', Number(process.env.BCRYPT_ROUNDS)),
			createdAt: new Date(),
			updatedAt: new Date(),
		} ], {});
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.bulkDelete('Users', null, {});
	},
};
