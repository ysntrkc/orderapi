import OrderService from "../services/order";

class OrderController {
    static async createOrder(req, res) {
        const order = await OrderService.createOrder(req, res);
        if (order.type === "true") {
            return res.status(200).json({ type: "true", message: order.message });
        } else {
            return res.status(500).json({ type: "false", message: order.message });
        }
    }

    static async getOrders(req, res) {
        const orders = await OrderService.getOrders(req, res);
        if (orders.type === "true") {
            return res.status(200).json({ data: orders.data, type: "true", message: orders.message });
        } else {
            return res.status(500).json({ type: "false", message: orders.message });
        }
    }

    static async getOrdersByAdmin(req, res) {
        const orders = await OrderService.getOrdersByAdmin(req, res);
        if (orders.type === "true") {
            return res.status(200).json({ data: orders.data, type: "true", message: orders.message });
        } else {
            return res.status(500).json({ type: "false", message: orders.message });
        }
    }

    static async updateOrderStatus(req, res) {
        const order = await OrderService.updateOrderStatus(req, res);
        if (order.type === "true") {
            return res.status(200).json({ type: "true", message: order.message });
        } else {
            return res.status(500).json({ type: "false", message: order.message });
        }
    }
}

export default OrderController;