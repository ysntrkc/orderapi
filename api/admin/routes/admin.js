import AdminController from '../controllers/admin';
import General from '../../helpers/general';
import express from 'express';

const app = express();

app.get('/users', AdminController.getAllUsers);
app.get('/users/:id', AdminController.getUser);
app.delete('/users/:id', AdminController.deleteUser);
app.post('/permissions', General.authorizeUser(1), AdminController.createPermission);
app.post('/permissions/role', General.authorizeUser(2), AdminController.addPermissionToRole);
app.get('/permissions', AdminController.getPermissions);
app.post('/roles/user', General.authorizeUser(2), AdminController.addRoleToUser);
app.get('/roles', AdminController.getRoles);

export default app;