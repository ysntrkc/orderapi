import express from "express";
import parser from "body-parser";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import Utils from "../utils/util.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(parser.json());

app.use("/routes/auth", authRoutes);
app.use("/routes/product", Utils.authorizeToken, productRoutes);
app.use("/routes/cart", Utils.authorizeToken, cartRoutes);

app.get('/health', (req, res) => {
    return res.json({ type: "true", message: "Server is up and running" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;