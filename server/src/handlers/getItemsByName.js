"use strict";

const { collections } = require("../services/database.service");

const getItemsByName = async (request, response) => {
  const { name } = request.params;

  try {
    const { items } = collections;

    // Create a text index on the "name" field
    await items.createIndex({ name: "text" });

    // Search for items that match the provided name
    const resultGetItems = await items
      .find({
        $text: { $search: `"${name}"` },
      })
      .toArray();

    resultGetItems.length > 0
      ? response.status(200).json({ status: 200, data: resultGetItems })
      : response.status(404).json({ status: 404, data: "Not Found" });
  } catch (err) {
    console.log(err.message);
    response.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

module.exports = { getItemsByName };
