const { Client, GatewayIntentBits, Collection } = require("discord.js");
const mongoose = require("mongoose");
const config = require("./config");
const commandHandler = require("./handlers/commandHandler");
const eventHandler = require("./handlers/eventHandler");

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
   READY EVENT - Start server ONLY after bot is ready
============================== */
client.once("ready", () => {
  console.log(`🔥 Logged in as ${client.user.tag}`);
  console.log("🚀 Starting web server...");
  
  // Start Express server AFTER Discord is ready
  try {
    require("./dashboard/server");
    console.log("🌐 Server startup initiated");
  } catch (err) {
    console.error("❌ Failed to start web server:", err);
  }
});

/* ==============================
   Login Bot
============================== */
console.log("🔑 Attempting to login to Discord...");
console.log("🔍 Token check:", config.token ? "✓ Token exists" : "✗ Token missing!");
console.log("🔍 Token length:", config.token ? config.token.length : 0);

client.login(config.token)
  .then(() => console.log("🤖 Login request sent to Discord - waiting for response..."))
  .catch((err) => {
    console.error("❌ Login Error:", err);
    console.error("❌ Error details:", {
      name: err.name,
      message: err.message,
      code: err.code
    });
    process.exit(1);
  });
