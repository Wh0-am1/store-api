const mongoose = require("mongoose");
const productsModel = require("./models/product");
require("dotenv").config();
const populate = require("./products.json");

const start = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
    await productsModel.create(populate);
    console.log("success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
