const mongoose = require("mongoose");
//const timestamp = require("mongoose-timestamp");

const areaSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  geometry: {
    type: {
      type: String,
      coordinates: {
        type: [[[Number]]],
      },
    },
  },

  name: {
    type: String,
  },
});

const myModel = mongoose.model("Areas", areaSchema, "Areas");
module.exports = myModel;
