const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const dealbreakerSchema = new Schema({
  question: {
    type: String,
  },
  name: {
    type: String,
  },
  not_name: {
    type: String,
  },
});

const Dealbreaker = model("Dealbreaker", dealbreakerSchema);

module.exports = Dealbreaker;
