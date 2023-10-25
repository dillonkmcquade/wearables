/*
  Verify user login credentials from database. Returns success only if _id: email exists.
*/

"use strict";

const { collections, redisClient } = require("../services/database.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
const signin = async (request, response) => {
  const { email } = request.body;
  const { password } = request.body;

  if (typeof email !== "string") {
    return response
      .status(400)
      .json({ status: 400, data: "TypeError: Email must be of type string" });
  }

  if (!email || email.length === 0) {
    return response.status(400).json({
      status: 400,
      data: {
        email: email || "Missing email",
      },
    });
  }

  try {
    const { auth, users } = collections;
    const resultGetOne = await auth.findOne({ _id: email.toLowerCase() });

    if (!resultGetOne) {
      return response
        .status(404)
        .json({ status: 404, data: "User does not exist" });
    }
    const { firstName, lastName, _id, cartId } = await users.findOne({
      _id: email,
    });

    //cleans order history from userObject
    const modifiedUserObject = {
      email: _id,
      firstName,
      lastName,
      cartId,
    };

    // Stretch goal: login with password
    const verified = await bcrypt.compare(password, resultGetOne.password);
    if (!verified) {
      return response
        .status(400)
        .json({ status: 400, data: "Incorrect password" });
    }
    const accessToken = jwt.sign(modifiedUserObject, process.env.JWT_SECRET, {
      expiresIn: "15 minutes",
    });

    const refreshToken = jwt.sign(modifiedUserObject, process.env.JWT_REFRESH, {
      expiresIn: "30 days",
    });

    await redisClient.set(refreshToken, "");

    return response
      .status(200)
      .json({ status: 200, accessToken, refreshToken });
  } catch (err) {
    console.error(err.message);
    response.status(500).json({ status: 500, data: err.message });
  }
};

module.exports = { signin };
