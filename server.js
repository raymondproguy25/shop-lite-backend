import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import wishlistRoutes from './routes/wishlistRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wishlist", wishlistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`);
});
