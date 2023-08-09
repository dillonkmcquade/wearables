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

  const client = new MongoClient(DB_STRING);
  await client.connect();

  const db = client.db(process.env.DB_NAME);

  const userCollection = db.collection("users");
  const orderCollection = db.collection("orders");
  const itemCollection = db.collection("items");
  const cartCollection = db.collection("carts");
  const companyCollection = db.collection("companies");
  const authCollection = db.collection("auth");

  await batchImportItems();
  await batchImportCompanies();

  collections.users = userCollection;
  collections.orders = orderCollection;
  collections.items = itemCollection;
  collections.carts = cartCollection;
  collections.companies = companyCollection;
  collections.auth = authCollection;
  console.log(`Successfully connected to database: ${db.databaseName}`);
}
module.exports = { collections, connectToDatabase, redisClient };
