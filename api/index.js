import express from "express";
import parser from "body-parser";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import Utils from "../utils/util.js";
import cookieParser from "cookie-parser";
import session from "express-session";

const PORT = process.env.PORT || 3000;
const oneDay = 1000 * 60 * 60 * 24;

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
}));
app.use(cookieParser());

app.use("/routes/auth", authRoutes);
app.use("/routes/product", Utils.authorizeBySession, productRoutes);
app.use("/routes/cart", Utils.authorizeBySession, cartRoutes);
app.use("/routes/order", Utils.authorizeBySession, orderRoutes);

app.get('/health', (req, res) => {
    return res.json({ type: true, message: "Server is up and running" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;