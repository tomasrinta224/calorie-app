import passport from "passport";
import { Strategy } from "passport-http-bearer";
import userService from "../services/user.service";

export default passport.use(
  new Strategy(function (token, cb) {
    userService
      .findByToken(token)
      .then((user) => {
        if (!user) return cb(null, false);
        return cb(null, user);
      })
      .catch((err) => {
        return cb(err);
      });
  })
);
