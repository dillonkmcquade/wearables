/*
  Creates new order in orders collection, adds order Id to users orders, updates items in inventory
*/
"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const checkout = async (request, response) => {
  const {
    _id, //cartId
    email,
    creditCard,
    expiration,
    address,
    city,
    country,
    postalCode,
  } = request.body;

  //validate information from client
  if (
    !_id ||
    !creditCard ||
    !expiration ||
    !address ||
    !city ||
    !country ||
    !postalCode ||
    !email
  ) {
    return response.status(400).json({
      status: 400,
      message: "Missing data",
    });
  }

  const client = new MongoClient(MONGO_URI, options);
  let itemsOutOfStock = [];

  try {
    await client.connect();
    const db = client.db("e-commerce");

    //get cart from cart Id
    const userCart = await db.collection("carts").findOne({ _id });

    if (!userCart) {
      return response
        .status(404)
        .json({ status: 404, message: "Cart does not exist" });
    }
    if (!userCart.cartItems.length) {
      return response
        .status(400)
        .json({ status: 400, message: "Cart is empty" });
    }

    //return error if one or more items out of stock
    for (const item of userCart.cartItems) {
      const checkInventory = await db
        .collection("items")
        .findOne({ _id: item._id });
      if (checkInventory.numInStock < item.qty) {
        itemsOutOfStock.push(item._id);
      }
    }

    //if one or more items was out of inventory, return item id's as array
    if (itemsOutOfStock.length) {
      return response.status(500).json({
        status: 500,
        message: "One or more items was out of stock",
        failed: itemsOutOfStock,
      });
    }

    //update inventory quantities of items greater than zero
    for (const item of userCart.cartItems) {
      const updateInventory = await db
        .collection("items")
        .updateOne(
          { _id: item._id, numInStock: { $gt: 0 } },
          { $inc: { numInStock: -item.qty } }
        );
      if (
        updateInventory.matchedCount === 0 ||
        updateInventory.modifiedCount === 0
      ) {
        return response
          .status(500)
          .json({ status: 500, message: "Inventory error" });
      }
    }

    //Create new order in orders collection
    const newOrder = {
      cartId: _id,
      address,
      city,
      country,
      postalCode,
      itemsPurchased: { ...userCart.cartItems },
    };
    const insertOrder = await db.collection("orders").insertOne(newOrder);

    if (!insertOrder.insertedId) {
      return response
        .status(500)
        .json({ status: 500, message: "Failed to create new order" });
    }

    // Add order Id to users orders array
    const addOrderToUser = await db
      .collection("users")
      .updateOne(
        { cartId: _id },
        { $push: { orders: insertOrder.insertedId } }
      );

    if (!addOrderToUser.modifiedCount || !addOrderToUser.matchedCount) {
      return response.status(500).json({
        status: 500,
        message: "Failed to add order to users order history",
      });
    }

    const clearCart = await db
      .collection("carts")
      .updateOne({ _id }, { $set: { cartItems: [] } });

    if (clearCart.matchedCount === 0 || clearCart.modifiedCount === 0) {
      response
        .status(400)
        .json({ status: 400, message: "Error clearing users cart" });
    } else {
      //success
      response.status(201).json({
        status: 201,
        message: "Success",
        orderId: insertOrder.insertedId,
      });
    }
  } catch (err) {
    console.error(err);
    response.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = { checkout };
