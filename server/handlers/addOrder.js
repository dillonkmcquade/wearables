"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");// if needed

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addOrder = async (request, response) => {

  // //getting params from body
  // const { _idFromBody, someParam, anotherParam } = request.body;

  // //getting params from params
  // const { _idFromParams, somethingElse } = request.params

  // //testing params
  // if(!_id || !someParam || !anotherParam || !somethingElse){
  //   return response.status(400).json({status: 400, data: {_id: _id || "Missing Params", someParam: someParam || "Missing someParam", anotherParam: anotherParam || "Missing anotherParam", somethingElse: somethingElse || "Missing somethingElse"}})
  // }

  const client = new MongoClient(MONGO_URI, options);

  try {

    await client.connect();
    const db = client.db("projectName");

    // //add one
    // const resultInsert = await db.collection("collectionName").insertOne(data);

    // //get all
    // const resulGetAll = await db.collection("collectionName").find().toArray();

    // // get one
    // const resultGetOne = await db.collection("collectionName").findOne({ _id: _id });

    // //update one
    // const resultUpdate = await db.collection("collectionName").updateOne({ _id: _id}. {$set: something})
    // //or if is the data is nested
    // const resultUpdateNested = await db.collection("collectionName").updateOne({ _id: _id, "nested.param": something },
    // { $set: { "nested.$.something" : somethingElse } })

    // //delete
    // const resultDelete = await db.collection("collectionName").deleteOne({_id: _id});

    // // generating unique ID
    // let _id = uuidv4();
    // let isDuplicate = resultGet.find(reservation => reservation._id === _id)
    // while(isDuplicate){
    //   _id = uuidv4()
    //   isDuplicate = resultGet.find(reservation => reservation._id === _id)
    // }


    // //result AddOne
    // resultAddOne
    //   ? response.status(201).json({status: 201, data: data})
    //   : response.status(400).json({ status: 400, message:"Bad request", data: data});

    // //result getAll
    // resulGetAll
    //   ? response.status(200).json({ status: 200, data: data })
    //   : response.status(404).json({ status: 404, data: "Not Found" });

    // //result getOne
    // resultGetOne
    //   ? response.status(200).json({ status: 200, data: data })
    //   : response.status(404).json({ status: 404, data: "Not Found" });

    // //result update
    // if(!resultUpdate.matchedCount){
    //   response.status(404).json({ status: 404, message: "No id found" })
    // } else if (!resultUpdate.modifiedCount) {
    //   response.status(409).json({ status: 409, message: "Modification equal to pre-existent data" });
    // } else { response.status(200).json({status:200, message: "Data successfully modified"}) };
    
    // //resultDelete
    // if(!resultDelete.deletedCount){
    //   response.status(404).json({ status: 404, message: "No id found" })
    // } else {
    //   response.sendStatus(204)
    // }

  } catch (err) {
    (err) => console.log(err);
  } finally {
    client.close();
  }
};

module.exports = { addOrder };