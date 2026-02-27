
const {SlashCommandBuilder}=require("discord.js");
const User=require("../../models/User");
module.exports={
data:new SlashCommandBuilder().setName("rank").setDescription("Your rank"),
async execute(interaction){
let user=await User.findOne({userId:interaction.user.id,guildId:interaction.guild.id});
if(!user) return interaction.reply("No data.");
interaction.reply(`Level: ${user.level} | XP: ${user.xp}`);
}};
