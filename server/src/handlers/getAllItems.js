"use strict";

const { collections } = require("../dataSource.js");
/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
const getAllItems = async (request, response) => {
  try {
    const items = collections?.items;
    if (!items) {
      console.log("COLLECTIONS NOT BEING LOADED !!!");
    }
    // Extract the limit and start parameters from the request query
    const { limit = 25, start = 0 } = request.query;

    // Parse the limit and start values as integers
    const parsedLimit = parseInt(limit);
    const parsedStart = parseInt(start);

    // Get the total number of items in the collection
    const totalItems = await items.estimatedDocumentCount();

    // Fetch the items with pagination
    const resultGetAll = await items
      .find()
      .skip(parsedStart)
      .limit(parsedLimit)
      .toArray();
    if (resultGetAll.length === 0) {
      return response
        .status(404)
        .json({ status: 404, message: "No items found" });
    }

    response.status(200).json({
      status: 200,
      data: resultGetAll,
      totalItems,
      limit: parsedLimit,
      start: parsedStart,
    });
  } catch (err) {
    console.log(err.message);
    response.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

module.exports = { getAllItems };
