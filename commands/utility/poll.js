
const {SlashCommandBuilder}=require("discord.js");
module.exports={
data:new SlashCommandBuilder().setName("poll").setDescription("Create poll")
.addStringOption(o=>o.setName("question").setDescription("Question").setRequired(true)),
async execute(interaction){
const q=interaction.options.getString("question");
const msg=await interaction.channel.send(`📊 ${q}\n👍 / 👎`);
await msg.react("👍"); await msg.react("👎");
interaction.reply({content:"Poll created",ephemeral:true});
}};
