import UserController from '../controllers/user';
import General from '../../helpers/general';
import express from 'express';

const app = express();

app.get('/users', UserController.getAllUsers);
app.get('/users/:id', UserController.getUser);
app.delete('/users/:id', UserController.deleteUser);
app.post('/permissions', General.authorizeUser(1), UserController.createPermission);
app.post('/permissions/role', General.authorizeUser(2), UserController.addPermissionToRole);
app.get('/permissions', UserController.getPermissions);
app.post('/roles/user', General.authorizeUser(2), UserController.addRoleToUser);
app.get('/roles', UserController.getRoles);

export default app;