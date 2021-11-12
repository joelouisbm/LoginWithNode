const mongoose = require("mongoose");
const debug = require("debug")("app:database");

module.exports.cnn = () => {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, (err) => {
    if (err) {
      debug(err);
      return err;
    }
    debug(`DB is connected!`);
  });
};
