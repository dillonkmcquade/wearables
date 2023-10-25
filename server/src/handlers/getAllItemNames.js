"use strict";

const { collections } = require("../services/database.service");

/**
 * Handler for getting all items
 * @param {import("express").Response} response
 */
const getAllItemNames = async (_, response) => {
  try {
    const { items } = collections;
    // Get distinct names of all items
    const distinctNames = await items.distinct("name");

    // Send the response with the distinct names
    response.status(200).json({ status: 200, data: distinctNames });
  } catch (err) {
    console.log(err.message);
    response.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

module.exports = { getAllItemNames };
