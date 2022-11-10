import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Variables
dotenv.config();
const port = process.env.PORT;
const connectionUri = process.env.CONNECTION_URI || "";

// Configurations
const app = express();

app.use(express.json());

// Routing
app.get("*", (_, res) => {
  res.sendStatus(403);
});

// Connections
mongoose.connect(connectionUri);

app.listen(port, () => {
  console.log(`[server]: server is running at http://localhost:${port}`);
});
