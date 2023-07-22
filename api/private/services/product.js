import db from '../../src/models';

class ProdService {

	static async getProducts(req, res) {
		try {
			const products = await db.Products.findAll();
			res.status(200);
			return { type: true, data: products, message: 'Products fetched successfully' };
		}
		catch (error) {
			throw error;
		}
	}

	static async addProduct(req, res) {
		try {
			const { name, price, stock_quantity } = req.body;
			const data = {
				name: name,
				price: price,
				stock_quantity: stock_quantity,
				createdAt: new Date(),
				updatedAt: new Date()
			};

			if (await db.Products.findOne({ where: { name: name } })) {
				res.status(409);
				return { type: false, message: 'Product already exists' };
			}

			const product = await db.Products.create(data);
			res.status(201);
			return { data: product, type: true, message: 'Product added successfully' };
		}
		catch (error) {
			throw error;
		}
	}

	static async updateStockQuantity(req, res) {
		try {
			const { id, stock_quantity } = req.body;
			const product = await db.Products.findOne({ where: { id: id } });
			if (product) {
				await db.Products.update({
					stock_quantity: stock_quantity,
					updatedAt: new Date()
				}, {
					where: { id: id }
				});
				res.status(200);
				return { type: true, message: 'Product updated successfully' };
			}
			else {
				res.status(404);
				return { type: false, message: 'Product not found' };
			}
		}
		catch (error) {
			throw error;
		}
	}

}

export default ProdService;