import ProdService from '../services/product';

class ProdController {

	static async getAllProducts(req, res) {
		const result = await ProdService.getProducts();
		if (result) {
			return res.status(200).json({ data: result, type: true, message: 'Products fetched successfully' });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async addProduct(req, res) {
		const result = await ProdService.addProduct(req, res);
		if (result.type) {
			return res.status(200).json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async updateStock(req, res) {
		const result = await ProdService.updateStockQuantity(req, res);
		if (result.type) {
			return res.status(200).json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

}

export default ProdController;