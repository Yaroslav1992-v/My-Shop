import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
dotenv.config();
const port = process.env.PORT || 8000;
connectDB();
const app = express();
app.get("/", (req, res) => {
  res.send("Api Is Running...");
});
app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log("server running on port " + port));
