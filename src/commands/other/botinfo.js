const { MessageEmbed } = require("discord.js");

module.exports = { 
  config: {
    name: "botinfo",
    aliases: ["binfo"],
    usage: "$botinfo",
    description: "Get some stats on the bot",
    permissions: "none"
  },
  run: async (bot, message, args) => {

    let d = new Date(bot.guilds.cache.get(message.guild.id).joinedTimestamp);

    const botembed = new MessageEmbed()
        .setTitle("Information")
        .setColor("#000000")
        .setThumbnail(bot.user.avatarURL())
        .addFields(
          { name: "Name" , value: bot.user.username, inline: true },
          { name: "Joined On", value: '' + d, inline: true },
          { name: "Total Servers", value: '' + bot.guilds.cache.size, inline: true}
        );
    message.channel.send({ embeds: [botembed] });
  }
}