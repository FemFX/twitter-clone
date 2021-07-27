import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../models/User";
import { generateMD5 } from "../utils/generateHash";

passport.use(
  new LocalStrategy(async (username, password, done): Promise<void> => {
    try {
      const user = await UserModel.findOne({
        $or: [{ email: username }, { username }],
      }).exec();
      if (!user) {
        return done(null, false);
      }
      if (user.confirmed && user.password === generateMD5(password + process.env.SECRET)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET || "secret",
      jwtFromRequest: ExtractJwt.fromHeader("token"),
    },

    async (payload: { data: any }, done) => {
      try {
        const user = await UserModel.findById(payload.data._id).exec();
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err: any, user: any) => {
    done(err, user);
  });
});

export { passport };
