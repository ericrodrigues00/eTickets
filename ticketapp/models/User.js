const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  cpf: String,
  email: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
