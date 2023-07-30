import db from '../src/models';

class Cart {

	static async addToCart(req) {
		try {
			const item = {
				product_id: req.body.product_id,
				quantity: req.body.quantity,
				user_id: req.session.user.id
			};

			const product = await db.Products.findOne({ where: { id: item.product_id } });

			if (!product || product.stock_quantity < item.quantity) {
				return { type: false, message: 'Product not found or insufficient stock' };
			}

			const cart = await db.Carts.findOrCreate({
				where: { user_id: item.user_id },
				defaults: { user_id: item.user_id }
			});

			item['cart_id'] = cart[0].id;

			const cartItem = await db.CartItems.findOne({
				where: { product_id: item.product_id, cart_id: item.cart_id }
			});

			if (!cartItem) {
				await db.CartItems.create({
					product_id: item.product_id,
					quantity: item.quantity,
					cart_id: item.cart_id
				});
			}
			else {
				await db.CartItems.update({
					quantity: cartItem.quantity + item.quantity
				}, {
					where: { product_id: item.product_id, cart_id: item.cart_id }
				});
			}

			await db.Products.update({
				stock_quantity: product.stock_quantity - item.quantity
			}, {
				where: { id: item.product_id }
			});
			await db.Carts.update({
				total: cart[0].total + (product.price * item.quantity)
			}, {
				where: { id: cart[0].id }
			});

			// TODO: Add localization
			return { type: true, message: 'Product added to cart successfully' };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async getCart(req) {
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

			// TODO: Add localization
			if (!cart) {
				return { type: false, message: 'Cart not found' };
			}

			// TODO: Add localization
			return { type: true, message: 'Cart retrieved successfully', data: cart };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default Cart;