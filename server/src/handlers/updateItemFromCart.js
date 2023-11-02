"use strict";

const { collections } = require("../dataSource.js");

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
const updateItemFromCart = async (request, response) => {
  //updateQty is the new amount of items chosen by the user in the FE
  const { _id, updateQty } = request.body;

  /** @type {string} */
  const cartId = request.auth.cartId;

  if (!cartId) {
    return response
      .status(400)
      .json({ status: 400, message: "Missing cart id" });
  }

  if (!_id) {
    return response
      .status(400)
      .json({ status: 400, message: "Missing item id" });
  }

  if (!updateQty) {
    return response
      .status(400)
      .json({ status: 400, message: "Missing item quantity" });
  }

  try {
    const { carts } = collections;

    const shoppingCart = await carts.findOne({ _id: cartId });

    if (!shoppingCart) {
      response.status(404).json({ status: 404, message: "Not Found" });
      return;
    }

    /**
     * checks if user has the item in the cart before updating quantity
     */
    const cartItem = shoppingCart.cartItems.find((item) => item._id === _id);

    if (!cartItem) {
      response.status(400).json({ message: "Item not part of user carts" });
      return;
    }

    if (updateQty === cartItem.qty) {
      response
        .status(409)
        .json({ status: 409, message: "The quantity is still the same" });
    }

    const resultUpdateItems = await carts.updateOne(
      { _id: cartId },
      {
        $set: { "cartItems.$[i].qty": updateQty },
      },
      {
        arrayFilters: [
          {
            "i._id": _id,
          },
        ],
      },
    );

    if (!resultUpdateItems.matchedCount) {
      response
        .status(404)
        .json({ status: 404, message: "No item found in the cart" });
    }

    if (!resultUpdateItems.modifiedCount) {
      response.status(409).json({
        status: 409,
        message: "Modification equal to pre-existent data",
      });
    }

    response
      .status(200)
      .json({ status: 200, message: "Item added to the cart" });
  } catch (err) {
    response.status(500).json({ status: 500, message: "Server error" });
  }
};

module.exports = { updateItemFromCart };
