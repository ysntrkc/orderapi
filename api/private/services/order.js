import db from '../../src/models';

class OrderService {

	static async createOrder(req, res) {
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
				status: 'pending'
			};

			const newOrder = await db.Orders.create(order).then(ord => {
				return ord;
			}).catch(err => {
				res.status(500);
				return { type: false, message: err.message };
			});

			cart.CartItems.forEach(async item => {
				const orderItem = {
					order_id: newOrder.id,
					product_id: item.product_id,
					quantity: item.quantity
				};

				await db.OrderItems.create(orderItem).then(oItem => {
					return oItem;
				}).catch(err => {
					res.status(500);
					return { type: false, message: err.message };
				});
			});

			await db.CartItems.destroy({ where: { cart_id: cart.id } });
			await db.Carts.destroy({ where: { user_id: req.session.user.id } });

			res.status(201);
			return { type: true, message: 'Order created successfully' };

		}
		catch (error) {
			res.status(500);
			return { type: false, message: error.message };
		}
	}

	static async getOrders(req, res) {
		try {
			const orders = await db.Orders.findAll({
				where: { user_id: req.session.user.id },
				include: {
					model: db.OrderItems
				}
			});
			if (orders) {
				res.status(200);
				return { type: true, data: orders, message: 'Orders fetched successfully' };
			}
			else {
				res.status(404);
				return { type: false, message: 'Orders not found' };
			}
		}
		catch (error) {
			res.status(500);
			return { type: false, message: error.message };
		}
	}

	static async getOrdersByAdmin(req, res) {
		try {
			const orders = await db.Orders.findAll({
				include: {
					model: db.OrderItems,
					include: {
						model: db.Products
					}
				}
			});
			res.status(200);
			return { type: true, data: orders, message: 'Orders fetched successfully' };
		}
		catch (error) {
			res.status(500);
			return { type: false, message: error.message };
		}
	}

	static async updateOrderStatus(req, res) {
		try {
			const order = await db.Orders.findOne({
				where: { id: req.params.id }
			});

			if (!order) {
				res.status(404);
				return { type: false, message: 'Order not found' };
			}

			await db.Orders.update({ status: req.body.status }, { where: { id: req.params.id } });

			res.status(200);
			return { type: true, message: 'Order status updated successfully' };
		}
		catch (error) {
			res.status(500);
			return { type: false, message: error.message };
		}
	}

}

export default OrderService;