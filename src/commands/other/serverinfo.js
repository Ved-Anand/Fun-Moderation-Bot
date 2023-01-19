const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name:"serverinfo",
    aliases: ["serverdesc"],
    usage: "serverinfo",
    description: "Get some information on the server you're in!",
    permissions: "none" 
  },
  run: async (bot, message, args) => {
    if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");

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
      message.channel.send({ embeds: [serverembed] });
  }
}