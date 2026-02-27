
const {SlashCommandBuilder,ChannelType}=require("discord.js");
const Ticket=require("../../models/Ticket");
module.exports={
data:new SlashCommandBuilder().setName("ticket").setDescription("Create ticket"),
async execute(interaction){
const channel=await interaction.guild.channels.create({
name:`ticket-${interaction.user.username}`,
type:ChannelType.GuildText
});
await Ticket.create({channelId:channel.id,userId:interaction.user.id,createdAt:new Date()});
interaction.reply({content:`Ticket created: ${channel}`,ephemeral:true});
}};
