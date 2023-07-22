import OrderController from '../controllers/order';
import General from '../../helpers/General';
import express from 'express';

const app = express();

app.post('/create', OrderController.createOrder);
app.get('/get', OrderController.getOrders);
app.get('/get/admin', General.authorizeUser(5), OrderController.getOrdersByAdmin);
app.post('/update/:id', General.authorizeUser(6), OrderController.updateOrderStatus);

export default app;