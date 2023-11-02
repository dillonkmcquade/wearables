/*
  Creates new order in orders collection, adds order Id to users orders, updates items in inventory
*/
"use strict";

const { collections } = require("../dataSource.js");

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
const checkout = async (request, response) => {
  const { cartId } = request.auth;
  const { email, creditCard, expiration, address, city, country, postalCode } =
    request.body;

  //validate information from client
  if (
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
      data: request.body,
    });
  }

  let itemsOutOfStock = [];

  try {
    const { carts, items, orders, users } = collections;
    //get cart from cart Id
    const userCart = await carts.findOne({ _id: cartId });

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
      const checkInventory = await items.findOne({ _id: item._id });
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
      const updateInventory = await items.updateOne(
        { _id: item._id, numInStock: { $gt: 0 } },
        { $inc: { numInStock: -item.qty } },
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
      cartId,
      address,
      city,
      country,
      postalCode,
      itemsPurchased: { ...userCart.cartItems },
    };
    const insertOrder = await orders.insertOne(newOrder);

    if (!insertOrder.insertedId) {
      return response
        .status(500)
        .json({ status: 500, message: "Failed to create new order" });
    }

    // Add order Id to users orders array
    const addOrderToUser = await users.updateOne(
      { cartId },
      { $push: { orders: insertOrder.insertedId } },
    );

    if (!addOrderToUser.modifiedCount || !addOrderToUser.matchedCount) {
      return response.status(500).json({
        status: 500,
        message: "Failed to add order to users order history",
      });
    }

    const clearCart = await carts.updateOne(
      { _id: cartId },
      { $set: { cartItems: [] } },
    );

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
    console.error(err.message);
    response.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { checkout };
