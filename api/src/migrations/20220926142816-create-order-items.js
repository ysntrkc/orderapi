'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('OrderItems', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			order_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Orders',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			product_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Products',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			quantity: {
				type: Sequelize.INTEGER,
				defaultValue: 1,
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
		await queryInterface.dropTable('OrderItems');
	},
};
