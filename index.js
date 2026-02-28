const { Client, GatewayIntentBits, Collection } = require("discord.js");
const mongoose = require("mongoose");
const config = require("./config");
const commandHandler = require("./handlers/commandHandler");
const eventHandler = require("./handlers/eventHandler");

require("./dashboard/server");

/* ==============================
   Prevent Silent Crashes
============================== */
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

/* ==============================
   Create Client
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
   MongoDB Connection
============================== */

mongoose.connect(config.mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
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
  .then(() => console.log("🤖 Bot Logged In Successfully"))
  .catch((err) => {
    console.error("❌ Login Error:", err);
    process.exit(1);
  });
