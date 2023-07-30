import db from '../src/models';

class Product {

	static async create(req) {
		try {
			const data = req.body;

			const product = await db.Products.findOrCreate({
				where: { name: data.name },
				defaults: data
			});

			// TODO: add localization
			if (!product[1]) {
				return { type: false, message: 'Product already exists' };
			}
			return { type: true, message: 'Product added successfully' };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async getAll(req) {
		try {
			const products = await db.Products.findAll({
				where: {
					is_removed: false
				},
				attributes: [
					'id',
					'name',
					'stock_quantity',
					'price'
				] });
			// TODO: add localization
			return { type: true, message: 'Products fetched successfully', data: products };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async updateStock(req) {
		try {
			const { id } = req.params;
			const { stock_quantity } = req.body;

			const product = await db.Products.update({
				stock_quantity: stock_quantity
			}, {
				where: { id: id }
			});

			// TODO: add localization
			if (!product) {
				return { type: false, message: 'Product not found' };
			}
			return { type: true, message: 'Product updated successfully' };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async delete(req) {
		try {
			const { id } = req.params;

			const product = await db.Products.update({
				is_removed: true
			}, {
				where: { id: id }
			});

			// TODO: add localization
			if (!product) {
				return { type: false, message: 'Product not found' };
			}
			return { type: true, message: 'Product deleted successfully' };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default Product;