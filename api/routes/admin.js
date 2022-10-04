import AdminController from "../controllers/admin";
import Utils from "../../utils/util";
import express from "express";

const app = express.Router();

app.get("/users", Utils.authorizeSysAdmin, AdminController.getAllUsers);
app.get("/users/:id", Utils.authorizeSysAdmin, AdminController.getUser);
app.delete("/users/:id", Utils.authorizeSysAdmin, AdminController.deleteUser);
app.post("/permissions", Utils.authorizeSysAdmin, Utils.authorizeUser(1), AdminController.createPermission);
app.post("/permissions/role", Utils.authorizeSysAdmin, Utils.authorizeUser(2), AdminController.addPermissionToRole);
app.get("/permissions", Utils.authorizeSysAdmin, AdminController.getPermissions);
app.post("/roles/user", Utils.authorizeSysAdmin, Utils.authorizeUser(2), AdminController.addRoleToUser);
app.get("/roles", Utils.authorizeSysAdmin, AdminController.getRoles);

export default app;