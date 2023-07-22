/*
  Verify user login credentials from database. Returns success only if _id: email exists.
*/

"use strict";

const { collections } = require("../services/database.service");
const bcrypt = require("bcrypt");

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
    verified
      ? response.status(200).json({ status: 200, data: modifiedUserObject })
      : response.status(400).json({ status: 400, data: "Incorrect password" });
  } catch (err) {
    console.error(err.message);
    response.status(500).json({ status: 500, data: err.message });
  }
};

module.exports = { signin };