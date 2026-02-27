
const {SlashCommandBuilder}=require("discord.js");
const User=require("../../models/User");
module.exports={
data:new SlashCommandBuilder().setName("daily").setDescription("Daily reward"),
async execute(interaction){
let user=await User.findOne({userId:interaction.user.id,guildId:interaction.guild.id});
if(!user) user=await User.create({userId:interaction.user.id,guildId:interaction.guild.id});
if(user.lastDaily && Date.now()-user.lastDaily<86400000) return interaction.reply("Already claimed.");
user.wallet+=200; user.lastDaily=Date.now(); await user.save();
interaction.reply("You received 200 coins.");
}};
