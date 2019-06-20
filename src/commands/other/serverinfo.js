const { RichEmbed } = require("discord.js");

module.exports = {
  config: {
    name:"serverinfo",
    aliases: ["serverdesc"],
    usage: "$serverinfo",
    description: "Get some information on the server you're in!",
    permissions: "none" 
  },
  run: async (bot, message, args) => {
    if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");

    let sicon = message.guild.iconURL; //server image

    let serverembed = new RichEmbed()
      .setDescription("Server Information")
      .setColor("#"+((1<<24)*Math.random()|0).toString(16)) //hex color randomizer
      .setThumbnail(sicon)
      .addField("Server Name", message.guild.name)
      .addField("Created On", message.guild.createdAt)
      .addField("You Joined", message.member.joinedAt)
      .addField("Total Members", message.guild.memberCount);
    message.channel.send(serverembed);
  }
}