import CartService from "../services/cart";

class CartController {
    static async addToCart(req, res) {
        const cart = await CartService.addToCart(req, res);
        if (cart.type === "true") {
            return res.status(200).json({ data: cart.data, type: "true", message: cart.message });
        } else {
            return res.status(500).json({ type: "false", message: cart.message });
        }
    }

    static async getCart(req, res) {
        const cart = await CartService.getCart(req, res);
        if (cart.type === "true") {
            return res.status(200).json({ data: cart.data, type: "true", message: cart.message });
        } else {
            return res.status(500).json({ type: "false", message: cart.message });
        }
    }
}

export default CartController;