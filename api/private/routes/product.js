import express from 'express';
import ProductController from '../controllers/product.js';
import General from '../../helpers/General.js';

const app = express();

app.get('/get', ProductController.getAllProducts);
app.post('/add', General.authorizeUser(3), ProductController.addProduct);
app.post('/update', General.authorizeUser(4), ProductController.updateStock);

export default app;