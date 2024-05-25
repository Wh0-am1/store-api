const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("connected");
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connectDB;
