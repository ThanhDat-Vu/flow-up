import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();

export default function sessionMiddleware(connectionUri: string) {
  return session({
    secret: process.env.SESSION_SECRET || "",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: MongoStore.create({
      mongoUrl: connectionUri,
      ttl: 14 * 24 * 60 * 60, // save session 14 days
      autoRemove: "interval",
      autoRemoveInterval: 24 * 60, // clears every day
    }),
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
      secure: false,
    },
  });
}
