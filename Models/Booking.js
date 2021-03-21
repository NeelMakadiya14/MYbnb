const mongoose = require("mongoose");
//const timestamp = require("mongoose-timestamp");

const areaSchema = new mongoose.Schema(
  {
    listing_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "listings",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    total_price: {
      type: Number,
    },
    total_people: Number,
    stay: {
      type: {
        from: Date,
        to: Date,
      },
    },
    mobile_number: Number,
  },
  { timestamps: true }
);

const myModel = mongoose.model("Bookings", areaSchema, "Bookings");
module.exports = myModel;
