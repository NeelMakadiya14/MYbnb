const mongoose = require("mongoose");
//const timestamp = require("mongoose-timestamp");

const resSchema = new mongoose.Schema({
    
    name: String
});


const myModel = mongoose.model("restaurants ", resSchema,"restaurants");
module.exports = myModel;