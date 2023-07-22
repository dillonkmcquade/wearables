/* 
 Retrieves an array of all companies from database
*/

"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getAllCompanies = async (request, response) => {
  const { limit = 24, start = 0 } = request.query;
  const client = new MongoClient(MONGO_URI, options);
  const parsedLimit = parseInt(limit);
  const parsedStart = parseInt(start);

  try {
    await client.connect();
    const db = client.db("e-commerce");

    const resultGetAll = await db
      .collection("companies")
      .find()
      .skip(parsedStart)
      .limit(parsedLimit)
      .toArray();

    // Get the total number of items in the collection
    const totalItems = await db.collection("companies").countDocuments();

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
    console.error(err);
    response.status(500).json({ status: 500, data: "Server error" });
  } finally {
    client.close();
  }
};

module.exports = { getAllCompanies };
