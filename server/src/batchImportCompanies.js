const { MongoClient } = require("mongodb");
const companies = require("../data/companies.json");

require("dotenv").config();
const { MONGO_URI } = process.env;

async function batchImportCompanies() {
  const dbName = "e-commerce"; // Specify the database name
  const collectionName = "companies"; // Specify the collection name

  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();

    const db = client.db(dbName);
    console.log("Connected to the database");

    const result = await db.collection(collectionName).insertMany(companies);
    console.log(`${result.insertedCount} documents inserted`);

    client.close();
    console.log("Disconnected from the database");
  } catch (error) {
    console.log("Error:", error);
  }
}

module.exports = { batchImportCompanies };
