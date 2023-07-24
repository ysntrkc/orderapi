import db from '../src/models';

class Order {

	static async create(req) {
		try {
			const cart = await db.Carts.findOne({
				where: { user_id: req.session.user.id },
				include: {
					model: db.CartItems,
					include: {
						model: db.Products
					}
				}
			});

			const order = {
				user_id: req.session.user.id,
				total: cart.total,
				status: 'pending',	// TODO: change this to enum
				OrderItems: cart.CartItems.map(item => {
					return {
						product_id: item.product_id,
						quantity: item.quantity
					};
				})
			};

			const createOrder = await db.Orders.create(order, {
				include: {
					model: db.OrderItems
				}
			});

			await db.CartItems.update({ is_removed: true }, { where: { cart_id: cart.id } });
			await db.Carts.update({ is_removed: true }, { where: { user_id: req.session.user.id } });

			// TODO: Add localization
			return { type: true, message: 'Order created successfully', data: createOrder };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async get(req) {
		try {
			const orders = await db.Orders.findAll({
				where: { user_id: req.session.user.id },
				include: {
					model: db.OrderItems,
					include: {
						model: db.Products
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
				include: {
					model: db.OrderItems,
					include: {
						model: db.Products
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

	static async updateStatus(req) {
		try {
			const order = await db.Orders.findOne({ where: { id: req.params.id } });

			if (!order) {
				return { type: false, message: 'Order not found' };	// TODO: Add localization
			}

			await db.Orders.update({ status: req.body.status }, { where: { id: req.params.id } });

			return { type: true, message: 'Order status updated successfully' };	// TODO: Add localization
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default Order;