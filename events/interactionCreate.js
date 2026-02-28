
module.exports={
name:"interactionCreate",
async execute(interaction,client){
if(!interaction.isChatInputCommand()) return;
const cmd=client.commands.get(interaction.commandName);
if(!cmd) return;
try{ await cmd.execute(interaction,client); }
catch(e){ console.error(e); interaction.reply({content:"Error",ephemeral:true}); }
}};
