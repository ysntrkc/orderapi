import express from "express";
import ProductController from "../controllers/product.js";
import Utils from "../../utils/util.js";

const app = express();

app.get("/get", ProductController.getAllProducts);
app.post("/add", Utils.authorizeUser(1), ProductController.addProduct);
app.post("/update", Utils.authorizeUser(2), ProductController.updateStock);

export default app;