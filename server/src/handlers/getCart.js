"use strict";

const { collections } = require("../services/database.service");

//ENDPOINT CREATED FOR THE CART PAGE

const getCart = async (request, response) => {
  // when logged in, the cartId will be saved on local storage passed as URL param
  const { _id } = request.params;

  if (!_id) {
    return response
      .status(400)
      .json({ status: 400, message: "No id provided" });
  }

  try {
    const { carts } = collections;

    const resultGetOne = await carts.findOne({ _id: _id });

    resultGetOne
      ? response.status(200).json({ status: 200, data: resultGetOne })
      : response.status(404).json({ status: 404, data: "Not Found" });
  } catch (err) {
    console.error(err.message);
    response.status(500).json({ status: 500, message: "Error" });
  }
};

module.exports = { getCart };
