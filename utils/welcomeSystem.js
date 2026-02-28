
const {EmbedBuilder}=require("discord.js");
module.exports=(member)=>{
const embed=new EmbedBuilder()
.setTitle("Welcome!")
.setDescription(`Welcome ${member}`)
.addFields({name:"Account Age",value:`<t:${Math.floor(member.user.createdTimestamp/1000)}:R>`});
member.guild.systemChannel?.send({embeds:[embed]});
};
