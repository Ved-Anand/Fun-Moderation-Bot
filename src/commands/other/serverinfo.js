const { EmbedBuilder, SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription("Get some information on the server you're in!")
    .setDMPermission(false),
  config: {
    name:"serverinfo",
    aliases: ["serverdesc"],
    usage: "serverinfo",
    description: "Get some information on the server you're in!",
    permissions: "none" 
  },
  run: async (bot, message, args) => {

    try {

      let sicon = message.guild.iconURL();
      let serverembed = new EmbedBuilder()
        .setDescription("Server Information")
        .setColor("#"+((1<<24)*Math.random()|0).toString(16)) //hex color randomizer
        .setThumbnail(sicon)
        .addFields(
          { name: "Server Name", value: message.guild.name, inline: true },
          { name: "Created On", value: ''+message.guild.createdAt, inline: true },
          { name: "You Joined", value: '' + message.member.joinedAt, inline: true },
          { name: "Total Members", value: '' + message.guild.memberCount, inline: true }
        )

        if (message instanceof ChatInputCommandInteraction) {
          message.reply({ embeds: [serverembed] });
        } else message.channel.send({ embeds: [serverembed] });
      } catch (err) {
        message.reply("Unfortunately an error occurred.");
        console.error(err);
      }
  }
}