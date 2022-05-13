const { Schema } = require("mongoose");

const movieSchema = new Schema({
  dddId: {
    type: String,
  },
  movieDbId: {
    type: String,
  },
  title: {
    type: String,
  },
  year: {
    type: String,
  },
  genre: {
    type: String,
  },
  overview: {
    type: String,
  },
  posterImage: {
    type: String,
  },
  dealbreakers: [String],
});

module.exports = movieSchema;
