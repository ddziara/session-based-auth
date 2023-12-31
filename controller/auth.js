const authService = require("../service/auth");

async function login(req, res) {
  const { email, password } = req.body;

  // perform payload validation
  // in prod always use a validation libreary like joi
  // for this tutorial we only do a basic validation
  if(!email || !password) {
    return res.status(400).json("Bad request parsms - you need to provide an email and a password");
  }

  try {
    const user = await authService.login(email, password);

    req.session.user = user;
    res.sendStatus(204);
  }
  catch(err) {
    // in prod, do not use console.log or console.error
    // use a proper loggin library like winston
    console.error(err);
    res.status(401).json(err);
  }
};

module.exports = {
    login
};