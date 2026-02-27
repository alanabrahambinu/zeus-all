
require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];
function read(dir){
  const files = fs.readdirSync(dir);
  for(const file of files){
    const full = path.join(dir,file);
    if(fs.lstatSync(full).isDirectory()) read(full);
    else if(file.endsWith(".js")){
      const cmd = require(full);
      if(cmd.data) commands.push(cmd.data.toJSON());
    }
  }
}
read("./commands");

const rest = new REST({version:"10"}).setToken(process.env.TOKEN);

(async()=>{
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    {body:commands}
  );
  console.log("Slash commands deployed");
})();
