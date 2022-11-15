import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import passportConfig from "./libs/passport";
import passport from "passport";
import sessionMiddleware from "./middlewares/session-middleware";
import UserRoute from "./routes/user-route";
import AuthRoute from "./routes/auth-route";
import mongoose from "mongoose";

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
    credentials: true, // allows cookies (or other user credentials)
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passportConfig();

// Session-based Auth
app.use(sessionMiddleware(connectionUri));
app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use("/api/v1/user", UserRoute);
app.use("/auth", AuthRoute);

app.get("*", (_, res) => {
  res.sendStatus(403);
});

// Connections
mongoose.connect(connectionUri);

app.listen(port, () => {
  console.log(`⚡[server]: server is running at http://localhost:${port}`);
});
