var mongoose = require("mongoose");

async function connect() {
  try {
    const connect = await mongoose.connect(
      "mongodb://localhost:27017/socketio",
    );
    console.log("DB connection successfull");
  } catch (error) {
    console.log(error);
  }
}
module.exports = connect;
