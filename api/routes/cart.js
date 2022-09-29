import CartController from '../controllers/cart';
import express from 'express';
const app = express();

app.post('/add', CartController.addToCart);
app.get('/get', CartController.getCart);

export default app;