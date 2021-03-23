const mongoose = require("mongoose");
//const timestamp = require("mongoose-timestamp");

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  summary: {
    type: String,
  },
  space: {
    type: String,
  },
  description: {
    type: String,
  },
  notes: {
    type: String,
  },
  transit: {
    type: String,
  },
  access: {
    type: String,
  },
  interaction: {
    type: String,
  },
  house_rules: {
    type: String,
  },
  property_type: {
    type: String,
  },
  room_type: {
    type: String,
  },
  bed_type: {
    type: String,
  },
  minimum_nights: {
    type: Number,
  },
  maximum_nights: {
    type: Number,
  },
  cancellation_policy: {
    type: String,
  },
  accommodates: {
    type: Number,
  },
  bedrooms: {
    type: Number,
  },
  beds: {
    type: Number,
  },
  number_of_reviews: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  amenities: {
    type: [String],
  },
  price: {
    type: Number,
  },
  cleaning_fee: {
    type: Number,
  },
  // mongoose.Schema.Types.Decimal128
  current_bookings: {
    type: [
      {
        bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Bookings" },
        from: Date,
        to: Date,
      },
    ],
  },
  images: {
    type: {
      thumbnail_url: String,
      medium_url: String,
      picture_url: String,
      xl_picture_url: String,
    },
  },
  host: {
    type: {
      host_id: String,
      host_name: String,
      host_location: String,
      host_about: String,
      host_response_time: String,
      host_thumbnail_url: String,
      host_picture_url: String,
      host_response_rate: Number,
      host_total_listings_count: Number,
    },
  },
  address: {
    type: {
      street: String,
      suburb: String,
      government_area: String,
      market: String,
      country: String,
      country_code: String,
      location: {
        type: String,
        coordinates: [Number],
        is_location_exact: Boolean,
      },
    },
    review_scores: {
      type: {
        review_scores_accuracy: Number,
        review_scores_cleanliness: Number,
        review_scores_checkin: Number,
        review_scores_communication: Number,
        review_scores_location: Number,
        review_scores_value: Number,
        review_scores_rating: Number,
      },
    },
    reviews: {
      type: [
        {
          _id: String,
          date: Date,
          listing_id: String,
          reviewer_id: String,
          reviewer_name: String,
          comments: String,
        },
      ],
    },
  },
});

const myModel = mongoose.model("listings", listingSchema, "listings");
module.exports = myModel;
