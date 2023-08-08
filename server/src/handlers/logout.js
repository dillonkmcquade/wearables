const { redisClient } = require("../services/database.service");

async function logout(req, res) {
  const auth = req.body["token"];
  if (!auth) {
    res.sendStatus(401);
  }
  await redisClient.del(auth);
  res.status(204);
}
module.exports = { logout };
