const jwt = require("jsonwebtoken");
const { redisClient } = require("../dataSource.js");

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
async function refreshToken(req, res) {
  const token = req.body["refreshToken"];

  if (!token) return res.sendStatus(401);

  const user = jwt.verify(token, process.env.JWT_REFRESH, (err, payload) => {
    if (err) return res.sendStatus(403);
    return payload;
  });

  await redisClient.del(token);

  const newUser = { cartId: user.cartId, email: user.email };

  const accessToken = jwt.sign(newUser, process.env.JWT_SECRET, {
    expiresIn: "15 minutes",
  });

  const refreshToken = jwt.sign(newUser, process.env.JWT_REFRESH, {
    expiresIn: "30 days",
  });

  await redisClient.set(refreshToken, "");

  return res.status(200).json({ status: 200, accessToken, refreshToken });
}

module.exports = { refreshToken };
