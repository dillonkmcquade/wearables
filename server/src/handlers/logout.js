const { redisClient } = require("../services/database.service");

async function logout(req, res) {
  const auth = req.body["token"];
  if (!auth) {
    res.sendStatus(401);
  }
  await redisClient.del(auth);
  return res.sendStatus(204);
}
module.exports = { logout };
