const express = require("express");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis").default;

const app = express();

// if you run behind a proxy (e.g. nginx)
//app.set("trust proxy", 1);

/*
  https://expressjs.com/en/guide/behind-proxies.html

  When running an Express app behind a reverse proxy, some of the Express APIs may return different values than expected. 
  In order to adjust for this, the trust proxy application setting may be used to expose information provided by 
  the reverse proxy in the Express APIs. The most common issue is express APIs that expose the client’s IP address 
  may instead show an internal IP address of the reverse proxy.

      When configuring the trust proxy setting, it is important to understand the exact setup of the reverse proxy. 
      Since this setting will trust values provided in the request, it is important that the combination of the setting 
      in Express matches how the reverse proxy operates.
*/

// 1. configure our redis
const redisClient = redis.createClient({
  port: 6379,
  host: "localhost",
});

redisClient.connect().catch(console.error);

// 2. configure session middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "mySecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false, // if true: only transmit cookie over https
      httpOnly: true, // if true: prevents client side JS from reading the cookie
      maxAge: 1000 * 60 * 30, // session max age in miliseconds (30 min)
    },
  })
);

// 3, create an unprotected login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req;

  // check if the credentials are correct
  // ...

  // assume that credentials are correct
  req.session.clientId = "abc123";
  req.session.myNum = 5;

  res.json("you are now logged in");
});

// 4. plug in another middleware that will check if the user is authenticated or not
// all request that are plugged in after this middleware will only be accessible if the user is logged in
app.use((req, res, next) => {
  if (!req.session || !req.session.clientId) {
    const err = new Error("You shall not pass");
    err.statusCode = 401;
    next(err);
  }

  next();
});

// 5. plug in all routes that the user can only access if logged in
app.get("/profile", (req, res) => {
  res.json(req.session);
});

// Note The following is an example - do not remove it!

// app.get(
//   "/profile",
//   (req, res, next /* check if user has sufficient privileges*/) => {},
//   (req, res) => {
//     res.json(req.session);
//   }
// );

app.listen(8080, () => {
  console.log("server is running on port 8080");
});

// cookie attributes:
//   cookie.domain - determines to which subdomains of server domain requests with cookie can be sent
//                   for example for server mail.example.com
//
//                   Set-Cookie: mailsession0=0000   // only request to domain mail.example.com will contain the cookie
//
//                   Set-Cookie: mailsession1=1111; domain=example.com   // only requests to domain example.com
//                   Set-Cookie: mailsession2=2222; domain=.example.com  //   and all subdomains (*.example.com) will contain the cookies
//
//                   Set-Cookie: mailsession7=7777; domain=mail.example.com   // only requests to domain mail.example.com
//                   Set-Cookie: mailsession8=8888; domain=.mail.example.com  //   and all subdomains (*.mail.example.com) will contain the cookies
//
//   cookie.path - similarly like about but for paths
//
//   cookie.sameSite - Strict, Lax, None
//
//                     "same-site" vs "same-origin"
//
//                     "same-site"
//                       * have the same scheme i.e. http ot https
//                       * have the same domain i.e example.com, andrewlock.net or microsoft.com
//                       (they don't need to have the same port or subdomain)
//
//                     "same-origin"
//                       * have the same scheme i.e. http ot https
//                       * have the same domain i.e example.com, andrewlock.net or microsoft.com
//                       * have the same subdomain i.e www.
//                       * have the same port
