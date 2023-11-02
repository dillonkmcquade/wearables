const { MongoClient } = require("mongodb");
const items = require("../data/items.json");

require("dotenv").config();
const { MONGO_URI } = process.env;

async function batchImportItems() {
  const dbName = "e-commerce"; // Specify the database name
  const collectionName = "items"; // Specify the collection name
  const client = new MongoClient(MONGO_URI);
  const db = client.db(dbName);

  try {
    await client.connect();
    console.log("Connected to the database");

    const result = await db.collection(collectionName).insertMany(items);
    console.log(`${result.insertedCount} documents inserted`);

    console.log("Disconnected from the database");
  } catch (error) {
    console.log("Error:", error);
  } finally {
    client.close();
  }
}

module.exports = { batchImportItems };
