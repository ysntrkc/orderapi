import express from "express";
import ProductController from "../controllers/product.js";
const app = express();

app.get("/all", ProductController.getAllProducts);
app.post("/add", ProductController.addProduct);
app.post("/update", ProductController.updateStock);

export default app;