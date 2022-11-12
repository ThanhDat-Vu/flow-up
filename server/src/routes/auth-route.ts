import dotenv from "dotenv";
import passport from "passport";
import express from "express";

dotenv.config();

const AuthRoute = express.Router();

AuthRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

AuthRoute.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (_, res) {
    res.redirect(`${process.env.CLIENT_URL}/settings`);
  }
);

AuthRoute.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL || "");
  });
});

export default AuthRoute;
