/*
  Verify user login credentials from database. Returns success only if _id: email exists.
*/

"use strict";
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

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

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("e-commerce");

    const resultGetOne = await db
      .collection("auth")
      .findOne({ _id: email.toLowerCase() });

    if (!resultGetOne) {
      return response
        .status(404)
        .json({ status: 404, data: "User does not exist" });
    }
    const { firstName, lastName, _id, cartId } = await db
      .collection("users")
      .findOne({ _id: email });

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
    console.error(err);
    response.status(500).json({ status: 500, data: err.message });
  } finally {
    client.close();
  }
};

module.exports = { signin };
