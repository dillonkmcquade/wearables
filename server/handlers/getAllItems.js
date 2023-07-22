"use strict";
const { MongoClient } = require("mongodb");
//const { v4: uuidv4 } = require("uuid");// if needed

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Handler for getting all items with pagination
const getAllItems = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("e-commerce");
    const collection = db.collection("items");
    
    // Extract the limit and start parameters from the request query
    const { limit = 25, start = 0 } = request.query

    // Parse the limit and start values as integers
    const parsedLimit = parseInt(limit);
    const parsedStart = parseInt(start);

    // Get the total number of items in the collection
    const totalItems = await collection.countDocuments();

    // Fetch the items with pagination
    const resultGetAll = await collection
    .find()
    .skip(parsedStart)
    .limit(parsedLimit)
    .toArray();
   
    // Send the response with the retrieved items and pagination details
    response.status(200).json({
      status: 200,
      data: resultGetAll,
      totalItems,
      limit: parsedLimit,
      start: parsedStart,
    });
  } catch (err) {
    console.log(err);
    response.status(500).json({ status: 500, error: "Internal Server Error" });
  } finally {
    client.close();
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