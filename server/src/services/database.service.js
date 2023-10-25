const { MongoClient } = require("mongodb");
const { createClient } = require("redis");
const { batchImportItems } = require("../batchImportItems");
const { batchImportCompanies } = require("../batchImportCompanies");
require("dotenv").config();

const collections = {};

const redisClient = createClient({ url: "redis://redis:6379" });

async function connectToDatabase() {
  //Mongo client url cannot be undefined, check before using
  if (process.env.MONGO_URI) {
    DB_STRING = process.env.MONGO_URI;
  } else {
    throw new Error("DB_CONN_STRING does not exist");
  }

  await redisClient.connect();
  const pong = await redisClient.ping();
  if (pong === "PONG") {
    console.log("Successfully connected to redis");
  }

  /** @type {import("mongodb").MongoClient} */
  const client = new MongoClient(DB_STRING);
  await client.connect();

  /** @type {import("mongodb").Db} */
  const db = client.db(process.env.DB_NAME);

  await batchImportItems();
  await batchImportCompanies();

  collections = {
    users: db.collection("users"),
    orders: db.collection("orders"),
    items: db.collection("items"),
    carts: db.collection("carts"),
    companies: db.collection("companies"),
    auth: db.collection("auth"),
  };
  console.log(`Successfully connected to database: ${db.databaseName}`);
}
module.exports = { collections, connectToDatabase, redisClient };
