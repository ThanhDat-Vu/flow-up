import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { PUBLIC_FIELDS } from "../models/user-model";

dotenv.config();

export default function passportConfig() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
      },
      async function verify(accessToken, refreshToken, profile, done) {
        const email = profile.emails ? profile.emails[0].value : "";
        const avatarUrl = profile.photos ? profile.photos[0].value : "";
        try {
          const user = await User.authWithGoogle({
            displayName: profile.displayName,
            googleId: profile.id,
            email,
            googleToken: { accessToken, refreshToken },
            avatarUrl,
          });
          done(null, user);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          done(err);
        }
      }
    )
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passport.serializeUser(function (user: any, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id)
      .select(PUBLIC_FIELDS)
      .lean()
      .exec((err, user) => done(err, user));
  });
}
