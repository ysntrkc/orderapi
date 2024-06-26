/**
 * @typedef CreateProduct
 * @property {string} name.required
 * @property {number} price.required
 * @property {number} stock_quantity.required
 */

/**
 * @typedef UpdateStock
 * @property {integer} stock_quantity.required
 */

import ProductService from '../services/Product';
import ProductValidation from '../validations/Product';
import Response from '../helpers/Response';
import { ResponseTypes } from '../src/enum';

class Product {

	/**
	 * @route POST /product
	 * @group Product - Operations about product
	 * @summary Create a new product
	 * @param {CreateProduct.model} product.body.required
	 * @returns {object} 200 - Success message
	 * @returns {Error}  default - Unexpected error
	 */
	static async create(req, res) {
		try {
			const validationResult = ProductValidation.create(req.body);
			if (!validationResult.type) {
				return res.json(Response.response(ResponseTypes.ERROR, validationResult.message));
			}
			const result = await ProductService.create(req, res);
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
	 * @route GET /product
	 * @group Product - Operations about product
	 * @summary Get all products
	 * @returns {object} 200 - Success
	 * @returns {Error}  default - Unexpected error
	 */
	static async getAll(req, res) {
		try {
			const result = await ProductService.getAll(req, res);
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
	 * @route PUT /product/stock/{id}
	 * @group Product - Operations about product
	 * @summary Update stock of a product
	 * @param {string} id.path.required
	 * @param {UpdateStock.model} product.body.required
	 * @returns {object} 200 - Success message
	 * @returns {Error}  default - Unexpected error
	 */
	static async updateStock(req, res) {
		try {
			const validationResult = ProductValidation.updateStock(req.body);
			if (!validationResult.type) {
				return res.json(Response.response(ResponseTypes.ERROR, validationResult.message));
			}
			const result = await ProductService.updateStock(req, res);
			if (!result.type) {
				return res.json(Response.response(ResponseTypes.ERROR, result.message));
			}
			return res.json(Response.response(ResponseTypes.SUCCESS, result.message));
		}
		catch (error) {
			return res.json(Response.response(ResponseTypes.ERROR, error.message));
		}
	}

	/**
	 * @route DELETE /product/{id}
	 * @group Product - Operations about product
	 * @summary Delete a product
	 * @param {string} id.path.required
	 * @returns {object} 200 - Success message
	 * @returns {Error}  default - Unexpected error
	 */
	static async delete(req, res) {
		try {
			const result = await ProductService.delete(req, res);
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

export default Product;
