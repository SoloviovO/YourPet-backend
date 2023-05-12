const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
require("dotenv").config();

const { UserModel } = require("../database/models/user.model");
const { createHash } = require("../services");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, PASSWORD_DATA } =
  process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/auth/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName, picture } = profile;
    const user = await UserModel.findOne({ email });
    if (user) {
      return done(null, user);
    }

    const passwordHash = await createHash(PASSWORD_DATA);
    const newUser = await UserModel.create({
      email,
      passwordHash,
      image: picture,
      name: displayName,
    });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
