const { Schema, model } = require("mongoose");

const movieSchema = require("./Movie");
const userSchema = require("./User").schema;

const groupSchema = new Schema({
  admin: String,
  joincode: String,
  movies: [movieSchema],
});

const Group = model("Group", groupSchema);

module.exports = Group;
