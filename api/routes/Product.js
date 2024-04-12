import express from 'express';
import ProductController from '../controllers/Product';
import General from '../helpers/General';
import { Permissions } from '../src/enum/permissions';

const app = express();

app.post('/', General.authorizeUser(Permissions.CREATE_PRODUCT), ProductController.create);
app.get('/', General.authorizeUser(Permissions.UPDATE_PRODUCT), ProductController.getAll);
app.put('/stock/:id', General.authorizeUser(Permissions.UPDATE_PRODUCT), ProductController.updateStock);
app.delete('/:id', General.authorizeUser(Permissions.UPDATE_PRODUCT), ProductController.delete);

export default app;
