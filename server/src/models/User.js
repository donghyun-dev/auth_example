const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  nickname: {
    type: String, 
    maxlength: 50,
  },
  password: {
    type: String,
    minglength: 5,
  },
  image: {
    type: String,
    default: "",
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    // console.log('password changed')
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  const user = this;
  console.log("user", user);
  console.log("userSchema", userSchema);
  var token = jwt.sign(user._id.toHexString(), "secret");
  var oneHour = moment().add(1, "hour").valueOf();

  const tokenInfo = {
    token,
    tokenExp: oneHour,
  };

  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user, tokenInfo);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  const user = this;
  jwt.verify(token, "secret", function (err, decode) {
    if (err) return cb(err);
    console.log({ decode });
    user.findOne({ _id: decode }, function (err, user) {
      console.log({ user });
      if (!user) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
