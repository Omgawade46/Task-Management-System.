const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { connectDB } = require("./config/db");
const cors = require("cors");



dotenv.config();
const app = express();


app.use(cors({
  origin: 'http://localhost:4200', // Angular dev server
  credentials: true // if you send cookies/auth headers
}));

// Middleware
app.use(bodyParser.json());

// DB Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



app.get("/", (req, res) => {
  res.send("API is running ✅");
});
