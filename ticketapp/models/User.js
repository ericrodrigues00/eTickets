const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  cpf: String,
  password: String,
  confirmPassword: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
