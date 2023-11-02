/* 
 Retrieves an array of all companies from database
*/

"use strict";

const { collections } = require("../dataSource.js");

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
const getAllCompanies = async (request, response) => {
  const { limit = 24, start = 0 } = request.query;
  const parsedLimit = parseInt(limit);
  const parsedStart = parseInt(start);

  try {
    /** @type {import("mongodb").Collection} */
    const companies = collections.companies;
    const resultGetAll = await companies
      .find()
      .skip(parsedStart)
      .limit(parsedLimit)
      .toArray();

    // Get the total number of items in the collection
    const totalItems = await companies.estimatedDocumentCount();

    // Fetch the items with pagination
    resultGetAll
      ? response.status(200).json({
          status: 200,
          totalItems,
          start: parsedStart,
          limit: parsedLimit,
          data: resultGetAll,
        })
      : response.status(404).json({ status: 404, data: "Not Found" });
  } catch (err) {
    console.error(err.message);
    response.status(500).json({ status: 500, data: "Server error" });
  }
};

module.exports = { getAllCompanies };
