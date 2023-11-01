const { Router } = require("express");
const { getAllItems } = require("../handlers/getAllItems");
const { getItemsByName } = require("../handlers/getItemsByName");

const itemRouter = Router();

itemRouter.get("/", getAllItems).get("/:name", getItemsByName);

module.exports = itemRouter;
