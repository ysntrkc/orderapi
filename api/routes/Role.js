import RoleController from '../controllers/Role';
import General from '../helpers/General';
import express from 'express';
import { Permissions } from '../src/enum/permissions';

const app = express();

app.get('/', RoleController.get);
app.post(
	'/assign-permission',
	General.authorizeUser(Permissions.ADD_ROLE_AND_PERMISSION),
	RoleController.assignPermission,
);

export default app;
