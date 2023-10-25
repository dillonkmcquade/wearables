"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { collections, redisClient } = require("../services/database.service");
const jwt = require("jsonwebtoken");

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
const signup = async (request, response) => {
  const { email, password, firstName, lastName, phoneNumber, address } =
    request.body;

  //testing params
  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !address
  ) {
    return response.status(400).json({
      status: 400,
      data: {
        email: email || "Missing email",
        password: password || "Missing password",
        firstName: firstName || "Missing first name",
        lastName: lastName || "Missing last name",
      },
    });
  }

  try {
    const { auth, users, carts } = collections;
    //checking if there is already any auth with this email
    const resultDuplicateAuth = await auth.findOne({
      _id: email.toLowerCase(),
    });
    if (resultDuplicateAuth) {
      return response
        .status(409)
        .json({ status: 409, message: `Email already in use` });
    }

    //encrypting the the given password
    const encryptedPassword = await bcrypt.hash(password, 10);
    const authData = { _id: email.toLowerCase(), password: encryptedPassword };

    //adding an authentication object
    const resultAddAuth = await auth.insertOne(authData);
    !resultAddAuth &&
      response
        .status(400)
        .json({ status: 400, message: "Bad request", data: authData });

    // generating unique cartID
    let cartId = uuidv4();
    let isDuplicate = await users.findOne({ cartId: cartId });
    while (isDuplicate) {
      cartId = uuidv4();
      isDuplicate = await users.findOne({ cartId: cartId });
    }

    //checking if user object already exist
    const resultDuplicateUser = await users.findOne({
      _id: email.toLowerCase(),
    });
    if (resultDuplicateUser) {
      return response
        .status(409)
        .json({ status: 409, message: `Email already in use` });
    }

    const userData = {
      _id: email.toLowerCase(),
      email: email.toLowerCase(),
      firstName,
      lastName,
      phoneNumber,
      address,
      cartId,
      orders: [],
    };

    //creating a new user
    const resultAddUser = await users.insertOne(userData);
    !resultAddUser &&
      response
        .status(400)
        .json({ status: 400, message: "Bad request", data: userData });

    const cartData = { _id: cartId, cartItems: [] };
    const resultAddCart = await carts.insertOne(cartData);

    const accessToken = jwt.sign({ cartId, email }, process.env.JWT_SECRET, {
      expiresIn: "15 minutes",
    });

    const refreshToken = jwt.sign({ cartId, email }, process.env.JWT_REFRESH, {
      expiresIn: "30 days",
    });

    await redisClient.set(refreshToken, "");
    !resultAddCart &&
      response
        .status(400)
        .json({ status: 400, message: "Bad request", data: cartData });

    response.status(201).json({
      status: 201,
      message: "Account successfully created",
      refreshToken,
      accessToken,
    });
  } catch (err) {
    console.log(err.message);
    response.status(500).json({ status: 500, message: "Server error" });
  }
};

module.exports = { signup };
