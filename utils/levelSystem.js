
const User=require("../models/User");
module.exports=async(message)=>{
let user=await User.findOne({userId:message.author.id,guildId:message.guild.id});
if(!user) user=await User.create({userId:message.author.id,guildId:message.guild.id});
user.xp+=5;
if(user.xp>=user.level*100+100){user.level++;message.channel.send(`${message.author} leveled up to ${user.level}`);}
await user.save();
};
