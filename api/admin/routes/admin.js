import AdminController from "../controllers/admin";
import Utils from "../../utils/util";
import express from "express";

const app = express.Router();

app.get("/users", AdminController.getAllUsers);
app.get("/users/:id", AdminController.getUser);
app.delete("/users/:id", AdminController.deleteUser);
app.post("/permissions", Utils.authorizeUser(1), AdminController.createPermission);
app.post("/permissions/role", Utils.authorizeUser(2), AdminController.addPermissionToRole);
app.get("/permissions", AdminController.getPermissions);
app.post("/roles/user", Utils.authorizeUser(2), AdminController.addRoleToUser);
app.get("/roles", AdminController.getRoles);

export default app;