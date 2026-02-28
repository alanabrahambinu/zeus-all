
const mongoose=require("mongoose");
module.exports=mongoose.model("GuildSettings",new mongoose.Schema({
guildId:String,
welcomeChannel:String,
autoRole:String,
logChannel:String
}));
