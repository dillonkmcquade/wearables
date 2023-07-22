const { MongoClient } = require("mongodb");
const companies = require("./data/companies.json");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function batchImport() {
  const dbName = "e-commerce"; // Specify the database name
  const collectionName = "companies"; // Specify the collection name

  try {
    const client = new MongoClient(MONGO_URI, options);
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

batchImport();