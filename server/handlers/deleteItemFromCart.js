"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteItemFromCart = async (request, response) => {
  const { cartId } = request.params;
  const { itemId } = request.body;

  console.log("Cart ID:", cartId);
  console.log("Item ID:", itemId);

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("e-commerce");
    const collection = db.collection("carts");

    const result = await collection.findOne({ _id: cartId });

    if (!result) {
      response.status(404).json({ status: 404, message: "Cart not found" });
      return;
    }

    const cartItems = result.cartItems;
    const itemIndex = cartItems.findIndex(
      (item) => String(item._id).trim() === String(itemId).trim()
    );

    if (itemIndex === -1) {
      response
        .status(404)
        .json({ status: 404, message: "Item not found in cart" });
      return;
    }

    cartItems.splice(itemIndex, 1); // Remove the item from the cartItems array

    await collection.updateOne(
      { _id: cartId },
      { $set: { cartItems } } // Update the cartItems array in the database
    );

    response
      .status(200)
      .json({ status: 200, message: "Item deleted from cart", cartItems });
  } catch (err) {
    console.log(err);
    response.status(500).json({ status: 500, error: "Internal Server Error" });
  } finally {
    client.close();
  }
};

module.exports = { deleteItemFromCart };
