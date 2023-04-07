/**
 * @typedef item
 * @property {integer} productId.required
 * @property {integer} quantity.required
 * @property {integer} userId.required
*/

import CartService from '../services/cart';
import CartValidation from '../validations/cart';

class Cart {

	/**
	 * @route POST /private/cart/add
	 * @group Cart - Operations about cart
	 * @param {item.model} item.body.required
	 * @returns {object} 200 - An array of user info
	 * @returns {Error}  default - Unexpected error
	 */
	static async addToCart(req, res) {
		const validationResult = CartValidation.addToCart(req.body);
		if (!validationResult.type) {
			return res.status(400).json({ type: false, message: validationResult.message });
		}
		const result = await CartService.addToCart(req, res);
		if (result.type) {
			return res.status(200).json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	/**
	 * @route GET /private/cart/get
	 * @group Cart - Operations about cart
	 * @returns {object} 200 - An array of user info
	 * @returns {Error}  default - Unexpected error
	 */
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

export default Cart;