/**
 * @typedef UpdateStatus
 * @property {integer} status_id.required
 */

import OrderService from '../services/Order';
import Response from '../helpers/Response';
import { ResponseTypes } from '../src/enum';

class Order {

	/**
	 * @route POST /order
	 * @group Order - Operations about order
	 * @summary Create a new order
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async create(req, res) {
		try {
			const result = await OrderService.create(req, res);
			if (!result.type) {
				return res.json(Response.response(ResponseTypes.ERROR, result.message));
			}
			return res.json(Response.response(ResponseTypes.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Response.response(ResponseTypes.ERROR, error.message));
		}
	}

	/**
	 * @route GET /order
	 * @group Order - Operations about order
	 * @summary Get order
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async get(req, res) {
		try {
			const result = await OrderService.get(req, res);
			if (!result.type) {
				return res.json(Response.response(ResponseTypes.ERROR, result.message));
			}
			return res.json(Response.response(ResponseTypes.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Response.response(ResponseTypes.ERROR, error.message));
		}
	}

	/**
	 * @route GET /order/all
	 * @group Order - Operations about order
	 * @summary Get all orders
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async getAll(req, res) {
		try {
			const result = await OrderService.getAll(req, res);
			if (!result.type) {
				return res.json(Response.response(ResponseTypes.ERROR, result.message));
			}
			return res.json(Response.response(ResponseTypes.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Response.response(ResponseTypes.ERROR, error.message));
		}
	}

	// TODO: use status_id and take it from request query
	/**
	 * @route PUT /order/{id}
	 * @group Order - Operations about order
	 * @param {integer} id.path.required
	 * @param {UpdateStatus.model} status.body.required
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async updateStatus(req, res) {
		try {
			const result = await OrderService.updateStatus(req, res);
			if (!result.type) {
				return res.json(Response.response(ResponseTypes.ERROR, result.message));
			}
			return res.json(Response.response(ResponseTypes.SUCCESS, result.message));
		}
		catch (error) {
			return res.json(Response.response(ResponseTypes.ERROR, error.message));
		}
	}

}

export default Order;
