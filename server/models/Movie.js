const { Schema, model } = require("mongoose");

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
  dealbreakers: [{ name: String }],
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
