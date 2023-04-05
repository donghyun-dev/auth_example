const { model, Schema } = require("mongoose");

const userSchema = Schema({
  username: {
    type: String,
    minglength: 10,
    trim: true,
  },
  email: {
    type: String,
    minglength: 20,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minglength: 20,
  },
  refleshToken: {
    type: Schema.Types.ObjectId,
    ref: "RefleshToken",
  },
});

const User = model("User", userSchema);

module.exports = { User };
