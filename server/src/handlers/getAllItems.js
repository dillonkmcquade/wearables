"use strict";

const { collections } = require("../services/database.service");

// Handler for getting all items with pagination
/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
const getAllItems = async (request, response) => {
  try {
    const { items } = collections;
    // Extract the limit and start parameters from the request query
    const { limit = 25, start = 0 } = request.query;

    // Parse the limit and start values as integers
    const parsedLimit = parseInt(limit);
    const parsedStart = parseInt(start);

    // Get the total number of items in the collection
    const totalItems = await items.countDocuments();

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

    // Send the response with the retrieved items and pagination details
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

/* 
  How to use this endpoint in Insomnia:
  - Make a GET request to http://localhost:4000/items
  - To specify the limit and start parameters, append them to the URL as query parameters.
    Example: http://localhost:4000/items?limit=10&start=20
    - The "limit" parameter determines the maximum number of items to retrieve (default is 25).
    - The "start" parameter determines the index to start retrieving items from (default is 0).
    - Adjust the values of "limit" and "start" as per your requirements.
*/
