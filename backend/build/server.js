import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
const port = process.env.PORT || 8000;
connectDB();
const app = express();
app.get("/", (req, res) => {
    res.send("Api Is Running...");
});
app.get("/api/products", (req, res) => {
    res.json(products);
});
app.listen(port, () => console.log("server running on port " + port));
//# sourceMappingURL=server.js.map