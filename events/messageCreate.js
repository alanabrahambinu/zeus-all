
const Security = require("../models/SecuritySettings");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if(message.author.bot) return;

    let settings = await Security.findOne({guildId: message.guild.id});
    if(!settings) settings = await Security.create({guildId: message.guild.id});

    if(settings.lockdown && !message.member.permissions.has("Administrator")){
      return message.delete().catch(()=>{});
    }

    if(/https?:\/\//.test(message.content)){
      const allowed = settings.linkWhitelist.some(domain => message.content.includes(domain));
      if(!allowed) return message.delete().catch(()=>{});
    }

    if(settings.wordFilter.some(word => message.content.toLowerCase().includes(word))){
      return message.delete().catch(()=>{});
    }
  }
};
