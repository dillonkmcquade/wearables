/*
Retrieves one company from database by id 
*/

"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getOneCompany = async (request, response) => {
  const { _id } = request.params;
  if (!_id) {
    return response.status(400).json({
      status: 400,
      data: {
        _id: _id || "Missing Params",
        someParam: someParam || "Missing someParam",
        anotherParam: anotherParam || "Missing anotherParam",
        somethingElse: somethingElse || "Missing somethingElse",
      },
    });
  }

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("e-commerce");

    const resultGetOne = await db
      .collection("companies")
      .findOne({ _id: parseInt(_id) });

    resultGetOne
      ? response.status(200).json({ status: 200, data: resultGetOne })
      : response.status(404).json({ status: 404, data: "Not Found" });
  } catch (err) {
    console.error(err);
    response.status(500).json({ status: 500, data: "Server error" });
  } finally {
    client.close();
  }
};

module.exports = { getOneCompany };
