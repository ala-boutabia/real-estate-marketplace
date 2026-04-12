import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import errorHandler from "./middleware/errorHandler.js";


const app = express();
const PORT = process.env.PORT || 3000;

// -- Middleware --
app.use(express.json());
app.use(errorHandler)

// -- Routes --
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongodb");

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err.message);
    process.exit(1);
  }
};

startServer();
