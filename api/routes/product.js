import express from "express";
import ProductController from "../controllers/product.js";
import Authorize from "../../utils/authorize.js";
const app = express();

app.get("/all", ProductController.getAllProducts);
app.post("/add", Authorize.authorizeUser, ProductController.addProduct);
app.post("/update", Authorize.authorizeUser, ProductController.updateStock);

export default app;