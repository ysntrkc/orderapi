import express from 'express';
import CartController from '../controllers/Cart';

const app = express();

app.post('/add', CartController.addToCart);
app.get('/', CartController.getCart);

export default app;
