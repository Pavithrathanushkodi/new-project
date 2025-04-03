const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const meterReadingRoutes = require("./routes/meterReadingRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Use the routes
app.use("/api", meterReadingRoutes);

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
