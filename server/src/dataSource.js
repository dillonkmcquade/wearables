const { MongoClient } = require("mongodb");
const { createClient } = require("redis");
const process = require("node:process");
const { batchImportCompanies } = require("./batchImportCompanies");
const { batchImportItems } = require("./batchImportItems");

// connect to redis
const redisClient = createClient({ url: "redis://redis:6379" });

// connect to Mongo
/** @type {import("mongodb").MongoClient} */
const client = new MongoClient(process.env.MONGO_URI);

const db = client.db(process.env.DB_NAME);

const collections = {
  users: db.collection("users"),
  orders: db.collection("orders"),
  items: db.collection("items"),
  carts: db.collection("carts"),
  companies: db.collection("companies"),
  auth: db.collection("auth"),
};

async function connectToDatabase() {
  await client.connect();
  await redisClient.connect();
  await batchImportCompanies();
  await batchImportItems();
}

module.exports = { connectToDatabase, collections, redisClient };
