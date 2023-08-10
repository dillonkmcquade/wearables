"use strict";

const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const { connectToDatabase } = require("./services/database.service");
const authRouter = require("./Routes/auth");
const cartRouter = require("./Routes/cart");
const itemRouter = require("./Routes/items");
const companyRouter = require("./Routes/companies");

const PORT = process.env.PORT || 3001;
const app = express();

connectToDatabase()
  .then(() => {
    app
      .use(function (_req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Methods",
          "OPTIONS, GET, PUT, POST, DELETE",
        );
        res.header(
          "Access-Control-Allow-Headers",
          "Content-Type, Accept, Authorization",
        );
        next();
      })
      .use(compression())
      .use(morgan("dev"))
      .use(express.json())
      .use(express.urlencoded({ extended: false }))
      .use("/auth", authRouter)
      .use("/cart", cartRouter)
      .use("/items", itemRouter)
      .use("/companies", companyRouter)
      .get("/", (_, res) => {
        return res.sendStatus(200);
      })
      .get("*", (_, res) => {
        return res.sendStatus(404);
      });

    const server = app.listen(PORT, () =>
      console.log(`Listening on port ${PORT}`),
    );

    process.on("SIGTERM", () => {
      console.log("Shutting down gracefully...");
      setTimeout(() => {
        server.close(() => {
          process.exit();
        });
      }, 5000);
    });
  })
  .catch((error) => console.error(error.message));
