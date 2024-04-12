import PermissionController from '../controllers/Permission';
import General from '../helpers/General';
import express from 'express';
import { Permissions } from '../src/enum/permissions';

const app = express();

app.post('/', General.authorizeUser(Permissions.CREATE_ROLE_AND_PERMISSION), PermissionController.create);
app.get('/', PermissionController.get);

export default app;
