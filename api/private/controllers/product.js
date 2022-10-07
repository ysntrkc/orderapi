import ProdService from '../services/product';

/**
 * @typedef product
 * @property {string} name.required
 * @property {number} price.required
 * @property {number} stock_quantity.required
 */

class ProdController {

	/**
	 * @route GET /private/product/get
	 * @group Product - Operations about product
	 * @returns {object} 200 - An array of products
	 * @returns {Error}  default - Unexpected error
	 */
	static async getAllProducts(req, res) {
		const result = await ProdService.getProducts();
		if (result.type) {
			return res.json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.json({ type: false, message: result.message });
		}
	}

	/**
	 * @route POST /private/product/add
	 * @group Product - Operations about product
	 * @param {product.model} product.body.required
	 * @returns {object} 201 - Product added successfully
	 * @returns {object} 409 - Product already exists
	 * @returns {Error}  default - Unexpected error
	 */
	static async addProduct(req, res) {
		const result = await ProdService.addProduct(req, res);
		if (result.type) {
			return res.json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.json({ type: false, message: result.message });
		}
	}

	/**
	 * @route POST /private/product/update
	 * @group Product - Operations about product
	 * @param {product.model} product.body.required
	 * @returns {object} 200 - Product updated successfully
	 * @returns {object} 404 - Product not found
	 * @returns {Error}  default - Unexpected error
	 */
	static async updateStock(req, res) {
		const result = await ProdService.updateStockQuantity(req, res);
		if (result.type) {
			return res.json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.json({ type: false, message: result.message });
		}
	}

}

export default ProdController;