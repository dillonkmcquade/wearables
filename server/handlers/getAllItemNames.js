"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Handler for getting all items
const getAllItemNames = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("e-commerce");
    const collection = db.collection("items");

    // Get distinct names of all items
    const distinctNames = await collection.distinct("name");

    // Send the response with the distinct names
    response.status(200).json({ status: 200, data: distinctNames });
  } catch (err) {
    console.log(err);
    response.status(500).json({ status: 500, error: "Internal Server Error" });
  } finally {
    client.close();
  }
};

module.exports = { getAllItemNames };
