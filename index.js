require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

// Middleware
const notFound = require("./middleware/notFoundPage");
const { requireAuth } = require("./middleware/userMiddleware");

// Routes
const foodCategoryRoutes = require("./routes/foodCategoryRoutes");
const foodItemRoutes = require("./routes/foodItemRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

// Variables
const port = process.env.PORT || 3000;
const db = process.env.MONGO_URI;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// API Routes
app.use("/api/v1/foodCategories", foodCategoryRoutes);
app.use("/api/v1/foodItems", foodItemRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/users", userRoutes);
app.use(notFound);

// Server start
async function startServer() {
  try {
    await mongoose.connect(db);
    console.log("DB connection established");
    app.listen(port, () => {
      console.log(`Server running on localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
