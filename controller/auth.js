function login(req, res) {
  const { email, password } = req.body;

  // perform payload validation
  // in prod always use a validation libreary like joi
  // for this tutorial we only do a basic validation
  if(!email || !password) {
    return res.status(400).json("Bad request parsms - you need to provide an email and a password");
  }

  // check if the credentials are correct
  // ...

  // assume that credentials are correct
  req.session.clientId = "abc123";
  req.session.myNum = 5;

  res.json("you are now logged in");
};

module.exports = {
    login
};