import ProdService from "../services/product";

class ProdController {
    static async getAllProducts(req, res) {
        const products = await ProdService.getProducts();
        if (products) {
            return res.status(200).json({ data: products, type: true, message: "Products fetched successfully" });
        } else {
            return res.status(500).json({ type: false, message: error.message });
        }
    }

    static async addProduct(req, res) {
        const product = await ProdService.addProduct(req, res);
        if (product.type) {
            return res.status(200).json({ data: product.data, type: true, message: product.message });
        } else {
            return res.status(500).json({ type: false, message: product.message });
        }
    }

    static async updateStock(req, res) {
        const product = await ProdService.updateStockQuantity(req, res);
        if (product.type) {
            return res.status(200).json({ data: product.data, type: true, message: product.message });
        } else {
            return res.status(500).json({ type: false, message: product.message });
        }
    }
}

export default ProdController;