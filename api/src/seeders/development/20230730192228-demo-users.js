'use strict';
require('dotenv').config({ path: './env/development.env' });
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, _Sequelize) {
		await queryInterface.bulkInsert('Users', [ {
			name: 'Admin',
			surname: 'Admin',
			username: 'admin',
			email: 'admin@adm.com',
			password: bcrypt.hashSync('Pass123.', process.env.PASSWORD_SALT),
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: 'John',
			surname: 'Doe',
			username: 'johndoe',
			email: 'john@doe.com',
			password: bcrypt.hashSync('Pass123.', process.env.PASSWORD_SALT),
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: 'Jane',
			surname: 'Doe',
			username: 'janedoe',
			email: 'jane@doe.com',
			password: bcrypt.hashSync('Pass123.', process.env.PASSWORD_SALT),
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		], {});

	},

	async down (queryInterface, _Sequelize) {
		await queryInterface.bulkDelete('Users', null, {});
	},
};
