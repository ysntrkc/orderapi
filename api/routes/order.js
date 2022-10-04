import OrderController from "../controllers/order";
import Utils from "../../utils/util";
import express from "express";

const app = express();

app.post("/create", OrderController.createOrder);
app.get("/get", OrderController.getOrders);
app.get("/get/admin", Utils.authorizeUser(5), OrderController.getOrdersByAdmin);
app.post("/update/:id", Utils.authorizeUser(6), OrderController.updateOrderStatus);

export default app;