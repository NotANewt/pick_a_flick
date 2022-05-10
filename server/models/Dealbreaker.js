const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const dealbreakerSchema = new Schema({
  // Does The Dog Die question
  does_name: [
    {
      type: String,
    },
  ],
  //   More yes than no votes
  name: {
    type: String,
  },
  // More no than yes votes
  not_name: {
    type: String,
  },
});

module.exports = dealbreakerSchema;
