
const fs = require("fs");
const path = require("path");
module.exports = (client)=>{
  function load(dir){
    const files = fs.readdirSync(dir);
    for(const file of files){
      const full = path.join(dir,file);
      if(fs.lstatSync(full).isDirectory()) load(full);
      else if(file.endsWith(".js")){
        const cmd = require(full);
        if(cmd.data) client.commands.set(cmd.data.name, cmd);
      }
    }
  }
  load("./commands");
};
