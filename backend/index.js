const express = require("express");
const cors = require("cors");
const mainRouter = require("./mainRouter");
const app = express();

require("dotenv").config();

app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "DELETE", "PUT"], 
  credentials: true,
  allowedHeaders: "Content-Type, Authorization"  
}));

app.use(express.json());

// Use mainRouter under /v1
app.use("/v1", mainRouter);

// Basic route for health check
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Catch-all for undefined routes
app.use((req, res, next) => {
  res.status(404).send({ error: "Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

module.exports = app;
