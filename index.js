const express = require("express");
const router = require("./routes");

const session = require("./middleware/session");

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

app.use(express.json());

app.use(session);

app.use(router);

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
