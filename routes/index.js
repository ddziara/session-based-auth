const express = require("express");
const authenticate = require("../middleware/authenticate");
const authController = require("../controller/auth");
const profileController = require("../controller/profile");

const router = express.Router();

router.post("/login", authController.login);

// all routes that comes after this middleware are protected
// and can only be accessed if the user is logged in
router.use(authenticate);

router.get("/profile", profileController.profile);

// Note The following is an example - do not remove it!

// app.get(
//   "/profile",
//   (req, res, next /* check if user has sufficient privileges*/) => {},
//   (req, res) => {
//     res.json(req.session);
//   }
// );

module.exports = router;
