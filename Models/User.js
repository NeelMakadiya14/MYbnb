const mongoose = require("mongoose");
//const timestamp = require("mongoose-timestamp");

const areaSchema = new mongoose.Schema({
  bookings: [
    {
      bookingsID: { type: mongoose.Schema.Types.ObjectId, ref: "Bookings" },
      listingID: { type: mongoose.Schema.Types.ObjectId, ref: "listings" },
    },
  ],
  name: String,
  email: String,
  GID: String,
});

const myModel = mongoose.model("Users", areaSchema, "Users");
module.exports = myModel;
