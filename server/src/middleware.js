const jwt = require("jsonwebtoken");
async function auth(req, res, next) {
  const authorization = req.headers["authorization"];
  const accessToken = authorization?.split(" ")[1];
  if (!authorization || !accessToken) {
    console.log(req.headers);
    return res.sendStatus(401);
  }

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.auth = user;
    return next();
  });
}
module.exports = { auth };
