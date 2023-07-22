"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getItemsByName = async (request, response) => {
  const { name } = request.params;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("e-commerce");
    const collection = db.collection("items");

    // Create a text index on the "name" field
    await collection.createIndex({ name: "text" });

    // Search for items that match the provided name
    const resultGetItems = await collection.find({
      $text: { $search: `"${name}"` },
    }).toArray();

    resultGetItems.length > 0
      ? response.status(200).json({ status: 200, data: resultGetItems })
      : response.status(404).json({ status: 404, data: "Not Found" });
  } catch (err) {
    console.log(err);
    response
      .status(500)
      .json({ status: 500, error: "Internal Server Error" });
  } finally {
    client.close();
  }
};

module.exports = { getItemsByName };