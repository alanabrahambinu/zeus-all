const express = require("express");
const config = require("../config");

const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.listen(config.port, () => {
  console.log(`🌐 Dashboard running on port ${config.port}`);
});
