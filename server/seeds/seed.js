const db = require("../config/connection");
const { Dealbreaker } = require("../models");

const dealbreakerData = require("./dealbreakerData.json");

db.once("open", async () => {
  // seed dealbreakers
  await Dealbreaker.deleteMany({});

  const dealbreakers = await Dealbreaker.insertMany(dealbreakerData);

  console.log("Dealbreakers seeded!");
  process.exit(0);
});
