const Discord = require("discord.js"); //get discord repo
//Point of command: Give some facts about server
//Command Syntax: $serverinfo

module.exports.run = async (bot, message, args) => {
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed() //create kewl embed
    .setDescription("Server Information")
    .setColor("#"+((1<<24)*Math.random()|0).toString(16))
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);
  message.channel.send(serverembed);
}
module.exports.help = {
  name:"serverinfo"
}