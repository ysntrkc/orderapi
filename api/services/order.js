import db from "../../src/models";

class OrderService {
    static async createOrder(req) {
        try {
            const cart = await db.Carts.findOne({
                where: { userId: req.userId },
                include: {
                    model: db.CartItems,
                    include: {
                        model: db.Products
                    }
                }
            });

            const order = {
                userId: req.userId,
                total: cart.total,
                status: "pending"
            }

            const newOrder = await db.Orders.create(order).then(order => {
                return order;
            }).catch(err => {
                return { type: false, message: err.message };
            });

            cart.CartItems.forEach(async item => {
                const orderItem = {
                    orderId: newOrder.id,
                    productId: item.productId,
                    quantity: item.quantity
                }

                await db.OrderItems.create(orderItem).then(orderItem => {
                    return orderItem;
                }).catch(err => {
                    return { type: false, message: err.message };
                });
            })

            await db.CartItems.destroy({ where: { cartId: cart.id } });
            await db.Carts.destroy({ where: { userId: req.userId } });

            return { type: true, message: "Order created successfully" };

        } catch (error) {
            return { type: false, message: error.message };
        }
    }

    static async getOrders(req) {
        try {
            const orders = await db.Orders.findAll({
                where: { userId: req.userId },
                include: {
                    model: db.OrderItems,
                }
            });

            return { type: true, data: orders, message: "Orders fetched successfully" };

        } catch (error) {
            return { type: false, message: error.message };
        }
    }

    static async getOrdersByAdmin() {
        try {
            const orders = await db.Orders.findAll({
                include: {
                    model: db.OrderItems,
                    include: {
                        model: db.Products
                    }
                }
            });

            return { type: true, data: orders, message: "Orders fetched successfully" };

        } catch (error) {
            return { type: false, message: error.message };
        }
    }

    static async updateOrderStatus(req, res) {
        try {
            const order = await db.Orders.findOne({
                where: { id: req.params.id }
            });

            if (!order) {
                return { type: false, message: "Order not found" };
            }

            await db.Orders.update({ status: req.body.status }, { where: { id: req.params.id } });

            return { type: true, message: "Order status updated successfully" };

        } catch (error) {
            return { type: false, message: error.message };
        }
    }
}

export default OrderService;