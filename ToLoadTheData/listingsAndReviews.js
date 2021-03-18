const mongoose = require("mongoose");
//const timestamp = require("mongoose-timestamp");

const listingSchema = new mongoose.Schema({
    
    listing_url : String,
    name : String,
});


const myModel = mongoose.model("lAR", listingSchema,"listingsAndReviews");
module.exports = myModel;