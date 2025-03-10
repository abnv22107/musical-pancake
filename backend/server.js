const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); // Import path module
const { ESLint } = require("eslint"); // Import ESLint

// Load .env file from the root directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Code Review Assistant Backend");
});

// Code Analysis Route
app.post("/api/analyze", async (req, res) => {
    const { code } = req.body;
  
    try {
      console.log("Received code:", code); // Debugging log
      const eslint = new ESLint({
        overrideConfigFile: path.resolve(__dirname, ".eslintrc.json"), // Specify the config file path
      });
      const results = await eslint.lintText(code);
      console.log("ESLint results:", results); // Debugging log
      res.json({ message: "Code analysis complete", issues: results[0].messages });
    } catch (error) {
      console.error("Error analyzing code:", error);
      res.status(500).json({ message: "Error analyzing code", error: error.message });
    }
  });

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));