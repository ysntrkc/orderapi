import db from '../src/models';
import { Lang } from '../src/enum';

class Product {

	static async create(req) {
		try {
			const { lang } = req.headers;
			const data = req.body;

			const product = await db.Products.findOrCreate({
				where: { name: data.name },
				defaults: data
			});

			// TODO: add localization
			if (!product[1]) {
				return { type: false, message: Lang[lang].Product.alreadyExists };
			}
			return { type: true, message: Lang[lang].Product.createSuccess };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async getAll(req) {
		try {
			const { lang } = req.headers;
			const products = await db.Products.findAll({
				where: {
					is_removed: false
				},
				attributes: [
					'id',
					'name',
					'stock_quantity',
					'price'
				]
			});
			return { type: true, message: Lang[lang].Product.getSuccess, data: products };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async updateStock(req) {
		try {
			const { lang } = req.headers;
			const { id } = req.params;
			const { stock_quantity } = req.body;

			const product = await db.Products.update({
				stock_quantity: stock_quantity
			}, {
				where: { id: id }
			});

			if (!product) {
				return { type: false, message: Lang[lang].Product.notFound };
			}
			return { type: true, message: Lang[lang].Product.updateSuccess };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

	static async delete(req) {
		try {
			const { lang } = req.headers;
			const { id } = req.params;

			const product = await db.Products.update({
				is_removed: true
			}, {
				where: { id: id }
			});

			// TODO: add localization
			if (!product) {
				return { type: false, message: Lang[lang].Product.notFound };
			}
			return { type: true, message: Lang[lang].Product.deleteSuccess };
		}
		catch (error) {
			return { type: false, message: error.message };
		}
	}

}

export default Product;