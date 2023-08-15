const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  price: Number,
});

const Ticket = mongoose.model("ticket", ticketSchema);

module.exports = Ticket;
