require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const connectDB = require("./db.js");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//Allow CORS
app.use(cors());

const server = http.createServer(app);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server is running on port ${port}`));

//Logging
if (process.env.NODE_ENV === "Development") {
  app.use(morgan("dev"));
}

const Area = require("./Models/Area");
const Listings = require("./Models/listings");

connectDB();

/*************************************************************************************************************************************************************** ***/
/*** TO LOAD DATA OF SAMPLE AIRBNB DB USING THE LOCATION OF SAMPLE RESTAURENT DB INTO OUR DB(MYBNB)   ***/

// const fetch = require("node-fetch");

// let url1 = "http://localhost:8000/";
// let url2 = "http://localhost:8888/";

// let settings = { method: "Get" };

// var obj1 = {};
// var obj2 = {};

// fetch(url1, settings)
//   .then((res) => res.json())
//   .then((json1) => {
//     fetch(url2, settings)
//       .then((res) => res.json())
//       .then((json2) => {
//         json1.forEach((x, index) => {
//           const obj = {
//             name: x.name,
//             summary: x.summary,
//             space: x.space,
//             description: x.description,
//             notes: x.notes,
//             transit: x.transit,

//             access: x.access,

//             interaction: x.interaction,
//             house_rules: x.house_rules,
//             property_type: x.property_type,
//             room_type: x.room_type,
//             bed_type: x.bed_type,
//             minimum_nights: x.minimum_nights,
//             maximum_nights: x.maximum_nights,
//             cancellation_policy: x.cancellation_policy,
//             accommodates: x.accommodates,
//             bedrooms: x.bedrooms,
//             beds: x.beds,
//             number_of_reviews: x.number_of_reviews,
//             bathrooms: x.bathrooms,
//             amenities: x.amenities,
//             price: x.price,
//             cleaning_fee: x.cleaning_fee,
//             images: x.images,

//             address: {
//               street: x.address.street,
//               suburb: x.address.suburb,
//               government_area: x.address.government_area,
//               market: x.address.market,
//               country: x.address.country,
//               country_code: x.address.country_code,
//               location: {
//                 type: x.address.location.type,
//                 coordinates: json2[4 * index].address.coord,
//                 is_location_exact: x.address.location.is_location_exact,
//               },
//             },

//             host: {
//               host_id: x.host.host_id,
//               host_name: x.host.host_name,
//               host_location: x.host.host_location,
//               host_about: x.host.host_about,
//               host_response_time: x.host.host_response_time,
//               host_thumbnail_url: x.host.host_thumbnail_url,
//               host_picture_url: x.host.host_picture_url,
//               host_response_rate: x.host.host_response_rate,
//               host_total_listings_count: x.host.host_total_listings_count,
//             },

//             review_scores: x.review_scores,
//             reviews: x.reviews,
//           };

//           Listings.create(obj)
//             .then((res) => console.log(res))
//             .catch((err) => console.error(err));
//         });
//       });
//   });

/*************************************************************************************************************************************************************** ***/
