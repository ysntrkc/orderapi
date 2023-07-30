import PermissionController from '../controllers/Permission';
import General from '../helpers/General';
import express from 'express';

const app = express();

app.post('/', General.authorizeUser(1), PermissionController.create);
app.get('/', PermissionController.get);

export default app;