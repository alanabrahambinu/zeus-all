
const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = async (member) => {
  const button = new ButtonBuilder()
    .setCustomId("verify_user")
    .setLabel("Verify")
    .setStyle(ButtonStyle.Success);

  const row = new ActionRowBuilder().addComponents(button);

  const msg = await member.send({
    content: "Click to verify yourself",
    components: [row]
  }).catch(()=>{});

  return msg;
};
