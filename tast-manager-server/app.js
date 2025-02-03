const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./configDB/db");

// Load environment variables
dotenv.config();
// Connect to the database
connectDB();

const app = express();

const cors = require("cors");

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cookieParser());
app.use(cors(corsOptions));
// Middleware
app.use(express.json()); // Body parser

// Routes
app.use("/tasks", require("./routes/TaskApi.js"));
app.use("/api", require("./routes/AuthRoutes.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
