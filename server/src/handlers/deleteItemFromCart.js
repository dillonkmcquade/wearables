"use strict";

const { collections } = require("../services/database.service");

const deleteItemFromCart = async (request, response) => {
  const { cartId } = request.params;
  const { itemId } = request.body;

  console.log("Cart ID:", cartId);
  console.log("Item ID:", itemId);

  try {
    const { carts } = collections;
    const result = await carts.findOne({ _id: cartId });

    if (!result) {
      response.status(404).json({ status: 404, message: "Cart not found" });
      return;
    }

    const cartItems = result.cartItems;
    const itemIndex = cartItems.findIndex(
      (item) => String(item._id).trim() === String(itemId).trim(),
    );

    if (itemIndex === -1) {
      response
        .status(404)
        .json({ status: 404, message: "Item not found in cart" });
      return;
    }

    cartItems.splice(itemIndex, 1); // Remove the item from the cartItems array

    await carts.updateOne(
      { _id: cartId },
      { $set: { cartItems } }, // Update the cartItems array in the database
    );

    response
      .status(200)
      .json({ status: 200, message: "Item deleted from cart", cartItems });
  } catch (err) {
    console.log(err.message);
    response.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

module.exports = { deleteItemFromCart };
