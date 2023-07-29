import express from 'express';
import OrderController from '../controllers/Order';
import General from '../helpers/General';

const app = express();

app.post('/', OrderController.create);
app.get('/', OrderController.get);
app.get('/all', General.authorizeUser(5), OrderController.getAll);
app.put('/:id', General.authorizeUser(6), OrderController.updateStatus);
