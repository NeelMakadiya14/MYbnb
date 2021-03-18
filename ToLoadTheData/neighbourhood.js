const mongoose = require("mongoose");
//const timestamp = require("mongoose-timestamp");

const listingSchema = new mongoose.Schema({
    
});


const myModel = mongoose.model("neighborhoods", listingSchema,"neighborhoods");
module.exports = myModel;