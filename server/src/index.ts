import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRoute from "./routes/user-route";

// Variables
dotenv.config();
const port = process.env.PORT;
const connectionUri = process.env.CONNECTION_URI || "";
const clientUrl = process.env.CLIENT_URL || "";

// Configurations
const app = express();

app.use(
  cors({
    origin: clientUrl,
  })
);

app.use(express.json());

// Routing
app.use("/api/v1/user", UserRoute);

app.get("*", (_, res) => {
  res.sendStatus(403);
});

// Connections
mongoose.connect(connectionUri);

app.listen(port, () => {
  console.log(`⚡[server]: server is running at http://localhost:${port}`);
});
