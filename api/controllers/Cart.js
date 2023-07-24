/**
 * @typedef CartItem
 * @property {integer} product_id.required
 * @property {integer} quantity.required
 * @property {integer} user_id.required
 */

import CartService from '../services/Cart';
import CartValidation from '../validations/Cart';
import Response from '../helpers/Response';
import { RoleTypes } from '../src/enum';

class Cart {

	/**
	 * @route POST /private/cart/add
	 * @group Cart - Operations about cart
	 * @param {CartItem.model} CartItem.body.required
	 * @returns {object} 200 - Success response
	 * @returns {Error}  default - Unexpected error
	 */
	static async addToCart(req, res) {
		try {
			const validationResult = CartValidation.addToCart(req.body, req.headers.lang);
			if (!validationResult.type) {
				return res.json(Response.response(RoleTypes.ERROR, validationResult.message));
			}
			const result = await CartService.addToCart(req, res);
			if (result.type) {
				return res.json(Response.response(RoleTypes.SUCCESS, result.message, result.data));
			}
			return res.json(Response.response(RoleTypes.ERROR, result.message));
		}
		catch (error) {
			return res.json(Response.response(RoleTypes.ERROR, error.message));
		}
	}

	/**
	 * @route GET /private/cart
	 * @group Cart - Operations about cart
	 * @returns {object} 200 - Success response
	 * @returns {Error}  default - Unexpected error
	 */
	static async getCart(req, res) {
		try {
			const result = await CartService.getCart(req);
			if (result.type) {
				return res.json(Response.response(RoleTypes.SUCCESS, result.message, result.data));
			}
			return res.json(Response.response(RoleTypes.ERROR, result.message));
		}
		catch (error) {
			return res.json(Response.response(RoleTypes.ERROR, error.message));
		}
	}

}

export default Cart;