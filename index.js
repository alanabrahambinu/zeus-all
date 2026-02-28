
require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const mongoose = require("mongoose");
const commandHandler = require("./handlers/commandHandler");
const eventHandler = require("./handlers/eventHandler");
require("./dashboard/server");

const client = new Client({
  intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(console.error);

commandHandler(client);
eventHandler(client);

client.login(process.env.TOKEN);
