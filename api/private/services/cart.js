import db from '../../src/models';

class CartService {

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

			let cart = await db.Carts.findOne({
				where: { user_id: item.user_id },
				include: {
					model: db.CartItems
				}
			});

			if (!cart) {
				cart = await db.Carts.create({ user_id: item.user_id }).then(cr => {
					return cr;
				}).catch(error => {
					return { type: false, message: error.message };
				});
			}

			item['cart_id'] = cart.id;

			let cartItem = await db.CartItems.findOne({
				where: { product_id: item.product_id, cart_id: item.cart_id }
			});

			if (!cartItem) {
				cartItem = await db.CartItems.create({
					product_id: item.product_id,
					quantity: item.quantity,
					cart_id: item.cart_id
				}).then(cItem => {
					return cItem;
				}).catch(err => {
					return { type: false, message: err.message };
				});
			}
			else {
				await db.CartItems.update({
					quantity: cartItem.quantity + item.quantity
				}, {
					where: { product_id: item.product_id, cart_id: item.cart_id }
				});
			}

			if (product) {
				await db.Products.update({
					stock_quantity: product.stock_quantity - item.quantity
				}, {
					where: { id: item.product_id } }
				);
				await db.Carts.update({
					total: cart.total + (product.price * item.quantity), updatedAt: new Date()
				}, { where: {
					id: cart.id }
				});
			}

			return { data: cartItem, type: true, message: 'Product added to cart successfully' };
		}
		catch (error) {
			throw error;
		}
	}

	static async getCart(req) {
		try {
			const user = await db.Users.findOne({
				where: { id: req.session.user.id },
				include: {
					model: db.Roles,
					include: {
						model: db.Permissions,
						through: []
					},
					through: []
				}
			});

			if (user) {
				const cart = await db.Carts.findOne({
					where: { user_id: req.session.user.id },
					include: {
						model: db.CartItems
					}
				});

				return { data: cart, type: true, message: 'Cart fetched successfully' };
			}
			else {
				return { type: false, message: 'User not found' };
			}
		}
		catch (error) {
			throw error;
		}
	}

}

export default CartService;