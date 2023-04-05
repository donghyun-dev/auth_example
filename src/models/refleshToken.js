const mongoose = require("mongoose");

const RefleshTokenSchema = mongoose.Schema({
 token: {
   type: String,
 },
 expiresIn: {
   type: String,
 }
});

const RefleshToken = mongoose.model("RefleshToken", RefleshTokenSchema);
module.exports = { RefleshToken };
