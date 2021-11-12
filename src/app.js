const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const debug = require("debug")("app:main");
require("dotenv").config();
require("./database/index").cnn();
const { initRoutes } = require("./routes/index");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

// Initialization the routes
initRoutes(app);

// Listening
app.listen(process.env.PORT, () => {
  debug(`Server run on port ${process.env.PORT}`);
});
