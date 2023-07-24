const { deleteItemFromCart } = require("../handlers/deleteItemFromCart");
const { updateItemFromCart } = require("../handlers/updateItemFromCart");
const { addItemToCart } = require("../handlers/addItemToCart");
const { checkout } = require("../handlers/checkout");
const { getCart } = require("../handlers/getCart");

const cartRouter = require("express").Router();
cartRouter
  .get("/:_id", getCart)
  .post("/checkout", checkout)
  .patch("/delete/:cartId", deleteItemFromCart)
  .patch("/update/:cartId", updateItemFromCart)
  .patch("/add/:cartId", addItemToCart);

module.exports = cartRouter;
