import RoleController from '../controllers/Role';
import General from '../helpers/General';
import express from 'express';

const app = express();

app.get('/', RoleController.get);
app.post('/assign-permission', General.authorizeUser(2), RoleController.assignPermission);

export default app;
