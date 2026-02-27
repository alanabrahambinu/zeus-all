
const {SlashCommandBuilder}=require("discord.js");
const User=require("../../models/User");
module.exports={
data:new SlashCommandBuilder().setName("balance").setDescription("Check balance"),
async execute(interaction){
let user=await User.findOne({userId:interaction.user.id,guildId:interaction.guild.id});
if(!user) user=await User.create({userId:interaction.user.id,guildId:interaction.guild.id});
interaction.reply(`Wallet: ${user.wallet} | Bank: ${user.bank}`);
}};
