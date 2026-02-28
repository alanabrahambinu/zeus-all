
const Security = require("../models/SecuritySettings");
let joinMap = new Map();

module.exports = async (member) => {
  let settings = await Security.findOne({guildId: member.guild.id});
  if(!settings) settings = await Security.create({guildId: member.guild.id});

  if(!settings.antiRaid) return;

  const now = Date.now();
  const joins = joinMap.get(member.guild.id) || [];
  joins.push(now);
  joinMap.set(member.guild.id, joins.filter(t => now - t < 10000));

  if(joinMap.get(member.guild.id).length > settings.joinThreshold){
    member.guild.setVerificationLevel(4).catch(()=>{});
    const channel = member.guild.systemChannel;
    channel?.send("⚠ Anti-Raid Activated: Verification level raised.");
  }
};
