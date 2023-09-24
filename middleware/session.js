const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redisClient = require("../db/redis");

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: "mySecret",
  saveUninitialized: false,
  resave: false,
  name: "sessionId",
  cookie: {
    secure: false, // if true: only transmit cookie over https
    httpOnly: true, // if true: prevents client side JS from reading the cookie
    maxAge: 1000 * 60 * 30, // session max age in miliseconds (30 min)
  },
});
