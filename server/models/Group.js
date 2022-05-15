const { Schema, model } = require("mongoose");

const movieSchema = require("./Movie");

const groupSchema = new Schema({
  admin: String,
  joincode: String,
  groupname: String,
  description: String,
  movies: [movieSchema],
});

const Group = model("Group", groupSchema);

module.exports = Group;
