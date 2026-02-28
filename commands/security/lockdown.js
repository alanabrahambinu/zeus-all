
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Security = require("../../models/SecuritySettings");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lockdown")
    .setDescription("Toggle server lockdown")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    let settings = await Security.findOne({guildId: interaction.guild.id});
    if(!settings) settings = await Security.create({guildId: interaction.guild.id});

    settings.lockdown = !settings.lockdown;
    await settings.save();

    interaction.reply(`Lockdown is now ${settings.lockdown ? "ENABLED" : "DISABLED"}`);
  }
};
