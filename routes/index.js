const express = require("express");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req;

  // check if the credentials are correct
  // ...

  // assume that credentials are correct
  req.session.clientId = "abc123";
  req.session.myNum = 5;

  res.json("you are now logged in");
});

router.use(authenticate);

router.get("/profile", (req, res) => {
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

module.exports = router;
