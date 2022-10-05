import db from '../../src/models';

class OrderService {

	static async createOrder(req) {
		try {
			const cart = await db.Carts.findOne({
				where: { userId: req.session.user.id },
				include: {
					model: db.CartItems,
					include: {
						model: db.Products
					}
				}
			});

			const order = {
				userId: req.session.user.id,
				total: cart.total,
				status: 'pending'
			};

			const newOrder = await db.Orders.create(order).then(ord => {
				return ord;
			}).catch(err => {
				return { type: false, message: err.message };
			});

			cart.CartItems.forEach(async item => {
				const orderItem = {
					orderId: newOrder.id,
					productId: item.productId,
					quantity: item.quantity
				};

				await db.OrderItems.create(orderItem).then(oItem => {
					return oItem;
				}).catch(err => {
					return { type: false, message: err.message };
				});
			});

			await db.CartItems.destroy({ where: { cartId: cart.id } });
			await db.Carts.destroy({ where: { userId: req.session.user.id } });

			return { type: true, message: 'Order created successfully' };

		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async getOrders(req) {
		try {
			const orders = await db.Orders.findAll({
				where: { userId: req.session.user.id },
				include: {
					model: db.OrderItems
				}
			});
			if (orders) {
				return { type: true, data: orders, message: 'Orders fetched successfully' };
			}
			else {
				return { type: false, message: 'Orders not found' };
			}
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async getOrdersByAdmin() {
		try {
			const orders = await db.Orders.findAll({
				include: {
					model: db.OrderItems,
					include: {
						model: db.Products
					}
				}
			});
			return { type: true, data: orders, message: 'Orders fetched successfully' };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async updateOrderStatus(req) {
		try {
			const order = await db.Orders.findOne({
				where: { id: req.params.id }
			});

			if (!order) {
				return { type: false, message: 'Order not found' };
			}

			await db.Orders.update({ status: req.body.status }, { where: { id: req.params.id } });

			return { type: true, message: 'Order status updated successfully' };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default OrderService;