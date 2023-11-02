const { MongoClient } = require("mongodb");
const companies = require("../data/companies.json");

require("dotenv").config();
const { MONGO_URI } = process.env;

async function batchImportCompanies() {
  const dbName = "e-commerce"; // Specify the database name
  const collectionName = "companies"; // Specify the collection name
  const client = new MongoClient(MONGO_URI);
  const db = client.db(dbName);

  try {
    await client.connect();
    console.log("Connected to the database");

    const result = await db.collection(collectionName).insertMany(companies);
    console.log(`${result.insertedCount} documents inserted`);

    console.log("Disconnected from the database");
  } catch (error) {
    console.log("Error:", error);
  } finally {
    client.close();
  }
}

module.exports = { batchImportCompanies };
