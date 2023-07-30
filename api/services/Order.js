import db from '../src/models';
import { OrderStatusTypes } from '../src/enum';

class Order {

	static async create(req) {
		try {
			const cart = await db.Carts.findOne({
				where: {
					user_id: req.session.user.id,
					is_removed: false
				},
				attributes: [
					'id',
					'total'
				],
				include: {
					model: db.Products,
					attributes: [
						'id',
						'name',
						'price'
					],
					through: {
						attributes: [ 'quantity' ]
					}
				}
			});

			if (!cart) {
				return { type: false, message: 'Cart not found' };	// TODO: Add localization
			}

			const order = {
				user_id: req.session.user.id,
				total: cart.total,
				status_id: OrderStatusTypes.PENDING,
				OrderItems: cart.Products.map(item => {
					return {
						product_id: item.id,
						quantity: item.CartItems.quantity
					};
				})
			};

			await db.Orders.create(order, {
				include: {
					model: db.OrderItems
				}
			});

			await db.CartItems.update({ is_removed: true }, { where: { cart_id: cart.id } });
			await db.Carts.update({ is_removed: true }, { where: { user_id: req.session.user.id } });

			// TODO: Add localization
			return { type: true, message: 'Order created successfully' };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async get(req) {
		try {
			const orders = await db.Orders.findAll({
				where: { user_id: req.session.user.id },
				attributes: [
					'id',
					'total',
					'status_id'
				],
				include: {
					model: db.Products,
					attributes: [
						'id',
						'name',
						'price'
					],
					through: {
						attributes: [
							'quantity'
						]
					}
				}
			});

			// TODO: Add localization
			return { type: true, message: 'Orders retrieved successfully', data: orders };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async getAll(req) {
		try {
			const orders = await db.Orders.findAll({
				attributes: [
					'id',
					'total',
					[ db.Sequelize.fn('concat',
						db.Sequelize.col('User.name'),
						' ',
						db.Sequelize.col('User.surname')),
					'user_name' ],
					[ db.Sequelize.col('OrderStatus.name'), 'status' ]
				],
				include: [
					{
						model: db.Products,
						attributes: [
							'id',
							'name',
							'price'
						],
						through: {
							attributes: [
								'quantity'
							]
						}
					},
					{
						model: db.Users,
						attributes: []
					},
					{
						model: db.OrderStatuses,
						attributes: []
					}
				]

			});

			// TODO: Add localization
			return { type: true, message: 'Orders retrieved successfully', data: orders };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async updateStatus(req) {
		try {
			const order = await db.Orders.findOne({ where: { id: req.params.id, is_removed: false } });

			if (!order) {
				return { type: false, message: 'Order not found' };	// TODO: Add localization
			}

			await db.Orders.update({ status_id: req.body.status_id }, { where: { id: req.params.id } });

			return { type: true, message: 'Order status updated successfully' };	// TODO: Add localization
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default Order;