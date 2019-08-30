const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String
  }
});

module.exports = User = mongoose.model("user", UserSchema);
