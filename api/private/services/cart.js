import db from '../../src/models';

class CartService {

	static async addToCart(req) {
		try {
			const item = {
				productId: req.body.productId,
				quantity: req.body.quantity,
				userId: req.session.user.id
			};

			const product = await db.Products.findOne({ where: { id: item.productId } });

			if (!product || product.stockQuantity < item.quantity) {
				return { type: false, message: 'Product not found or not enough stock' };
			}

			let cart = await db.Carts.findOne({
				where: { userId: item.userId },
				include: {
					model: db.CartItems
				}
			});

			if (!cart) {
				cart = await db.Carts.create({ userId: item.userId }).then(cr => {
					return cr;
				}).catch(error => {
					return { type: false, message: error.message };
				});
			}

			item['cartId'] = cart.id;

			let cartItem = await db.CartItems.findOne({
				where: { productId: item.productId, cartId: item.cartId }
			});

			if (!cartItem) {
				cartItem = await db.CartItems.create({
					productId: item.productId,
					quantity: item.quantity,
					cartId: item.cartId
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
					where: { productId: item.productId, cartId: item.cartId }
				});
			}

			if (product) {
				await db.Products.update({
					stockQuantity: product.stockQuantity - item.quantity
				}, {
					where: { id: item.productId } }
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
					where: { userId: req.session.user.id },
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