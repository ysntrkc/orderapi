import OrderService from '../services/order';

class OrderController {

	static async createOrder(req, res) {
		const result = await OrderService.createOrder(req, res);
		if (result.type) {
			return res.status(200).json({ type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async getOrders(req, res) {
		const result = await OrderService.getOrders(req, res);
		if (result.type) {
			return res.status(200).json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async getOrdersByAdmin(req, res) {
		const result = await OrderService.getOrdersByAdmin(req, res);
		if (result.type) {
			return res.status(200).json({ data: result.data, type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

	static async updateOrderStatus(req, res) {
		const result = await OrderService.updateOrderStatus(req, res);
		if (result.type) {
			return res.status(200).json({ type: true, message: result.message });
		}
		else {
			return res.status(500).json({ type: false, message: result.message });
		}
	}

}

export default OrderController;