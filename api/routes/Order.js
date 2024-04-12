import express from 'express';
import OrderController from '../controllers/Order';
import General from '../helpers/General';
import { Permissions } from '../src/enum/permissions';

const app = express();

app.post('/', OrderController.create);
app.get('/', OrderController.get);
app.get('/all', General.authorizeUser(Permissions.SHOW_ORDERS), OrderController.getAll);
app.put('/:id', General.authorizeUser(Permissions.UPDATE_ORDER_STATUS), OrderController.updateStatus);

export default app;
