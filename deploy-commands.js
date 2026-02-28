const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = require("./config");

/* ==============================
   Load All Commands
============================== */

const commands = [];

function read(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const full = path.join(dir, file);

    if (fs.lstatSync(full).isDirectory()) {
      read(full);
    } else if (file.endsWith(".js")) {
      const cmd = require(full);
      if (cmd.data) {
        commands.push(cmd.data.toJSON());
      }
    }
  }
}

read(path.join(__dirname, "commands"));

/* ==============================
   Deploy Commands
============================== */

const rest = new REST({ version: "10" }).setToken(config.token);

(async () => {
  try {
    console.log("🔄 Deploying slash commands...");

    await rest.put(
      Routes.applicationCommands(config.clientId),
      { body: commands }
    );

    console.log(`✅ Successfully deployed ${commands.length} commands.`);
  } catch (error) {
    console.error("❌ Slash Deploy Error:", error);
  }
})();
