const { deleteItemFromCart } = require("../handlers/deleteItemFromCart");
const { updateItemFromCart } = require("../handlers/updateItemFromCart");
const { addItemToCart } = require("../handlers/addItemToCart");
const { checkout } = require("../handlers/checkout");
const { getCart } = require("../handlers/getCart");
const { auth } = require("../middleware");

const cartRouter = require("express").Router();
cartRouter
  .use(auth)
  .get("/", getCart)
  .post("/checkout", checkout)
  .patch("/delete/", deleteItemFromCart)
  .patch("/update/", updateItemFromCart)
  .patch("/add/", addItemToCart);

module.exports = cartRouter;
