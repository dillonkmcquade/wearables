"use strict";
//ENDPOINT CREATED FOR THE CART PAGE
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCart = async (request, response) => {

  // when logged in, the cartId will be saved on local storage and than will be passed as URL param
  const { _id } = request.params;
  console.log(_id)

  if(!_id){
    return response.status(400).json({status: 400, message: "No id provided"})
  }

  const client = new MongoClient(MONGO_URI, options);

  try {

    await client.connect();
    const db = client.db("e-commerce");

    const resultGetOne = await db.collection("carts").findOne({ _id: _id });
    console.log(resultGetOne)

    resultGetOne
      ? response.status(200).json({ status: 200, data: resultGetOne})
      : response.status(404).json({ status: 404, data: "Not Found" });

  } catch (err) {
    (err) => console.log(err);
  } finally {
    client.close();
  }
};

module.exports = { getCart };