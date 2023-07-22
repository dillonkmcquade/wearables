"use strict";

const express = require("express");
const morgan = require("morgan");
const router = require("./Routes/Routes");
const { connectToDatabase } = require("./services/database.service");

const PORT = process.env.PORT || 4000;

connectToDatabase()
  .then(() => {
    express()
      .use(function (_req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Methods",
          "OPTIONS, GET, PUT, POST, DELETE",
        );
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
        next();
      })
      .use(morgan("tiny"))
      .use(express.json())
      .use(express.urlencoded({ extended: false }))
      .use("/", express.static(__dirname + "/"))
      .use(router)
      .listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((error) => console.error(error.message));
