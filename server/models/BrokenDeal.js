const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const brokenDealSchema = new Schema({
  // Does The Dog Die question
  does_name: {
    type: String,
  },
  name: {
    type: String,
  },
});

module.exports = brokenDealSchema;
