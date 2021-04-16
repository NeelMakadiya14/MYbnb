require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const connectDB = require("./db.js");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const moment = require("moment");

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
const User = require("./Models/User");
const Booking = require("./Models/Booking");
const Listing = require("./Models/listings");

connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Run everyday at 11:30 PM and remove expired bookings from current bookings of listing collection
cron.schedule("30 23 * * * ", () => {
  console.log("Called....");
  console.log(moment().utcOffset("+05:30"));
  Listing.updateMany(
    {},
    {
      $pull: {
        current_bookings: { to: { $lt: moment().utcOffset("+05:30") } },
      },
    }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
});

//routes

//........req.body for /booking looks like this
// {
//   "listing_id":"60532ce70de26448b919bd35",
//   "total_price" : 950.5,
//   "total_people" : 5,
//   "stay" : {
//       "from" : "2021-04-04",
//       "to" : "2021-03-06"
//   },
//   "mobile_number" : 7048170498
// }
app.post("/booking", async (req, res) => {
  const email = req.query.email;
  await User.findOne({ email }, (err, user) => {
    if (err) console.log(err);
    user_id = user._id;
    //  console.log(authorId);
  });

  const booking = { ...req.body, user_id };
  console.log(booking);
  await Booking.create(booking)
    .then((res) => {
      console.log(res);
      bookingId = res._id;
    })
    .catch((err) => console.log(err));

  const updatedListing = await Listing.updateOne(
    { _id: req.body.listing_id },
    {
      $push: { current_bookings: { ...req.body.stay, bookingId } },
    }
  );
  console.log(updatedListing);

  const updatedUser = await User.updateOne(
    { _id: user_id },
    {
      $push: {
        bookings: { bookingsID: bookingId, listingID: req.body.listing_id },
      },
    }
  );
  console.log(updatedUser);

  res.sendStatus(200);
});

//......... req.body for /adduser looks like.............
// {
//   "name": "neel",
//   "email" : "nmakadiya1@gmail.com",
//   "GID" : "1234567abc"
// }

app.post("/adduser", async (req, res) => {
  const newUser = { ...req.body, bookings: [] };
  //console.log(user);
  // console.log(req.body);
  // console.log(user);
  const email = req.body.email;
  User.find({ email }, (err, user) => {
    console.log(err);
    // console.log(user);
    console.log(user.length);

    if (user.length > 0) {
      console.log("user : ", user.length);
      res.send("Already Added");
    } else {
      console.log("not");
      User.create(user)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.error(err);
        });

      res.send("success");
    }
  });
});

app.get("/location_list", async (req, res) => {
  const name = req.query.name;
  console.log(name);
  Area.find({ $text: { $search: name } }, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } })
    .then((list) => {
      res.send(list);
    })
    .catch((err) => {
      console.log(err);
    });
});

// {
//   "address.location": "2dsphere",
//   "current_bookings.from": 1,
//   "current_bookings.to": -1,
//   "accommodates": -1
// }

app.get("/available_house", async (req, res) => {
  const checkIn = req.query.checkIn;
  const checkOut = req.query.checkOut;
  const location_name = req.query.location_name;
  const guest = req.query.guest;

  console.log(checkIn, checkOut);

  const local_area = await Area.findOne({ name: location_name });

  Listing.find(
    {
      "address.location": { $geoWithin: { $geometry: local_area.geometry } },
      current_bookings: {
        $not: { $elemMatch: { from: { $lt: checkOut }, to: { $gt: checkIn } } },
      },
      accommodates: { $gte: guest },
    },
    (err, info) => {
      console.log(info.length);
      console.error(err);
      res.send(info);
    }
  );
});

app.get("/getdetails", async (req, res) => {
  const _id = req.query._id;

  Listing.findOne({ _id }, (err, info) => {
    if (err) {
      console.error(err);
    }
    console.log(info);
    res.send(info);
  });
});

app.get("/mybookings", async (req, res) => {
  const email = req.query.email;
  User.findOne({ email })
    .populate("bookings.bookingsID")
    .populate("bookings.listingID")
    .exec((err, user) => {
      if (err) {
        console.error(err);
      }
      console.log(user);
      res.send(user);
    });
});

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
