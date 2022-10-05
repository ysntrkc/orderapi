import CartService from '../services/cart';

class CartController {

	static async addToCart(req, res) {
		const result = await CartService.addToCart(req, res);
		if (result.type) {
			return res.status(200).json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async getCart(req, res) {
		const result = await CartService.getCart(req, res);
		if (result.type) {
			return res.status(200).json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

}

export default CartController;