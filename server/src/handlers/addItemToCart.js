"use strict";

const { collections } = require("../dataSource.js");

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
const addItemToCart = async (request, response) => {
  const { _id, qty } = request.body;
  const user = request.auth;

  if (!_id) {
    return response
      .status(400)
      .json({ status: 400, message: "Missing item id" });
  }
  if (!qty) {
    return response
      .status(400)
      .json({ status: 400, message: "Missing item quantity" });
  }

  try {
    const { carts, items, companies } = collections;

    const shoppingCart = await carts.findOne({ _id: user.cartId });

    if (!shoppingCart) {
      return response.status(404).json({ status: 404, message: "Not Found" });
    }

    const cartContainsItem = shoppingCart.cartItems.some(
      (item) => item._id === _id,
    );

    if (cartContainsItem) {
      return response
        .status(400)
        .json({ status: 400, message: "Item already in cart" });
    }

    //get the item from items and create another similar object, but with a counter "qty" and a brand
    const originalItem = await items.findOne({ _id });

    if (!originalItem) {
      return response
        .status(404)
        .json({ status: 404, message: "Original item not Found" });
    }

    //get the brand from the companies collection
    const company = await companies.findOne({ _id: originalItem.companyId });

    if (!company) {
      return response
        .status(404)
        .json({ status: 404, message: "Company not Found" });
    }

    // Object to be inserted to cart
    const newCartItem = { ...originalItem, qty: qty, brand: company.name };

    const resultAddNewItem = await carts.updateOne(
      { _id: user.cartId },
      { $push: { cartItems: newCartItem } },
    );

    if (!resultAddNewItem.matchedCount) {
      return response
        .status(404)
        .json({ status: 404, message: "No item found in the cart" });
    } else if (!resultAddNewItem.modifiedCount) {
      return response.status(409).json({
        status: 409,
        message: "Modification equal to pre-existent data",
      });
    } else {
      return response
        .status(200)
        .json({ status: 200, message: "Item added to the cart" });
    }
  } catch (err) {
    console.log(err.message);
    return response.status(500).json({ status: 500, message: "Server error" });
  }
};

module.exports = { addItemToCart };
