const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;
const SALT_I = 10;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 0,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(SALT_I);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  }
});

// Functions
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = async function (cb) {
  const token = await jwt.sign(this._id.toHexString(), process.env.SECRET);
  this.token = token;
  this.save((err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  jwt.verify(token, process.env.SECRET, function (err, decode) {
    user.findOne(
      {
        _id: decode,
        token: token,
      },
      function (err, user) {
        if (err) {
          return cb(err);
        }
        cb(null, user);
      }
    );
  });
};

const userModel = mongoose.model("User", userSchema, "users");
module.exports = userModel;
