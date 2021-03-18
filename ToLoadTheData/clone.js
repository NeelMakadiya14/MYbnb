require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const monogoose = require("mongoose");

//Allow CORS
app.use(cors());

const server = http.createServer(app);

const port = 8000;
server.listen(port, () => console.log(`server is running on port ${port}`));

//Logging
if (process.env.NODE_ENV === "Development") {
  app.use(morgan("dev"));
}

const lar = require("./listingsAndReviews");

const connectDB = async () => {
  try {
    const conn = await monogoose.connect(process.env.MONGO_URI_SAMPLE_AIRBNB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (err) {
    console.log("Error : ");
    console.error(err);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  lar.find({}, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
      res.send(info);
    }
  });
});
