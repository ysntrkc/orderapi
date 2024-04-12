'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('RolePermissions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			role_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Roles',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			permission_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Permissions',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, _Sequelize) {
		await queryInterface.dropTable('RolePermissions');
	},
};
