/**
 * @typedef Order
 * @property {integer} userId.required
 * @property {number} total.required
 * @property {string} status.required
 */

import OrderService from '../services/order';
import OrderValidation from '../validations/order';

class Order {

	/**
	 * @route POST /private/order/create
	 * @group Order - Operations about order
	 * @param {Order.model} order.body.required
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async createOrder(req, res) {
		const validationResult = OrderValidation.createOrder(req.body);
		if (!validationResult.type) {
			return res.json({ type: false, message: validationResult.message });
		}
		const result = await OrderService.createOrder(req, res);
		if (result.type) {
			return res.json({ type: true, message: result.message });
		}
		else {
			return res.json({ type: false, message: result.message });
		}
	}

	/**
	 * @route GET /private/order/get
	 * @group Order - Operations about order
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async getOrders(req, res) {
		const result = await OrderService.getOrders(req, res);
		if (result.type) {
			return res.json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.json({ type: false, message: result.message });
		}
	}

	/**
	 * @route GET /private/order/get/admin
	 * @group Order - Operations about order
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async getOrdersByAdmin(req, res) {
		const result = await OrderService.getOrdersByAdmin(req, res);
		if (result.type) {
			return res.json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.json({ type: false, message: result.message });
		}
	}

	/**
	 * @route POST /private/order/update/{id}
	 * @group Order - Operations about order
	 * @param {string} id.path.required
	 * @param {string} status.body.required
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async updateOrderStatus(req, res) {
		const validationResult = OrderValidation.updateOrderStatus(req.body);
		if (!validationResult.type) {
			return res.json({ type: false, message: validationResult.message });
		}
		const result = await OrderService.updateOrderStatus(req, res);
		if (result.type) {
			return res.json({ type: true, message: result.message });
		}
		else {
			return res.json({ type: false, message: result.message });
		}
	}

}

export default Order;