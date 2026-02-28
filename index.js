const { Client, GatewayIntentBits, Collection } = require("discord.js");
const mongoose = require("mongoose");
const config = require("./config");
const commandHandler = require("./handlers/commandHandler");
const eventHandler = require("./handlers/eventHandler");

/* ==============================
   START EXPRESS SERVER (RENDER)
============================== */
require("./dashboard/server");

/* ==============================
   Prevent Silent Crashes
============================== */
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

/* ==============================
   Create Discord Client
============================== */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

/* ==============================
   READY EVENT (IMPORTANT)
============================== */
client.once("ready", () => {
  console.log(`🔥 Logged in as ${client.user.tag}`);
});

/* ==============================
   MongoDB Connection
============================== */
mongoose.connect(config.mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  });

/* ==============================
   Load Handlers
============================== */
commandHandler(client);
eventHandler(client);

/* ==============================
   Login Bot
============================== */
client.login(config.token)
  .then(() => console.log("🤖 Login request sent to Discord"))
  .catch((err) => {
    console.error("❌ Login Error:", err);
    process.exit(1);
  });
