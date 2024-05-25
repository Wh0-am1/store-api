require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const route = require("./routes/products");
const app = express();
require("express-async-errors");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

app.use("/api/v1/products", route);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000);
    console.log("port 3000 listening..");
  } catch (error) {
    console.log(error);
  }
};

start();
