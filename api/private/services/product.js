import db from '../../src/models';

class ProdService {

	static async getProducts() {
		try {
			const products = await db.Products.findAll();
			return products;
		}
		catch (error) {
			throw error;
		}
	}

	static async addProduct(req) {
		try {
			const { name, price, stock_quantity } = req.body;
			const data = {
				name: name,
				price: price,
				stockQuantity: stock_quantity,
				createdAt: new Date(),
				updatedAt: new Date()
			};

			if (await db.Products.findOne({ where: { name: name } })) {
				return { type: false, message: 'Product already exists' };
			}

			const product = await db.Products.create(data);
			return { data: product, type: true, message: 'Product added successfully' };
		}
		catch (error) {
			throw error;
		}
	}

	static async updateStockQuantity(req) {
		try {
			const { id, stock_quantity } = req.body;
			const product = await db.Products.findOne({ where: { id: id } });
			if (product) {
				await db.Products.update({
					stockQuantity: stock_quantity,
					updatedAt: new Date()
				}, {
					where: { id: id } });
				return { type: true, message: 'Product updated successfully' };
			}
			else {
				return { type: false, message: 'Product not found' };
			}
		}
		catch (error) {
			throw error;
		}
	}

}

export default ProdService;