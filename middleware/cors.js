const cors = require("cors");

const whitelist = new Set(["https://example1.com", "https://example2.com"]);

const corsOptions = {
  optionsSuccessStatus: 200, // some lagacy browsers (IE11, various SmartTVs) choke on 204
  origin: function (origin, callback) {
    if (whitelist.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = cors(corsOptions);