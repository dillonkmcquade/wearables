"use strict";

const { collections } = require("../dataSource.js");

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
const getCart = async (request, response) => {
  const user = request.auth;
  // when logged in, the cartId will be saved on local storage passed as URL param
  try {
    const { carts } = collections;

    const resultGetOne = await carts.findOne({ _id: user.cartId });

    resultGetOne
      ? response.status(200).json({ status: 200, data: resultGetOne })
      : response.status(404).json({ status: 404, data: "Not Found" });
  } catch (err) {
    console.error(err.message);
    response.status(500).json({ status: 500, message: "Error" });
  }
};

module.exports = { getCart };
