import express from 'express';
import ProductController from '../controllers/Product';
import General from '../helpers/General';

const app = express();

app.post('/', General.authorizeUser(3), ProductController.create);
app.get('/', General.authorizeUser(4), ProductController.getAll);
app.put('/stock/:id', General.authorizeUser(4), ProductController.updateStock);
app.delete('/:id', General.authorizeUser(4), ProductController.delete);

export default app;