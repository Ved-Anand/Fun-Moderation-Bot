const { EmbedBuilder, SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = { 
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Get some stats on the bot')
    .setDMPermission(false),
  config: {
    name: "botinfo",
    aliases: ["binfo"],
    usage: "botinfo",
    description: "Get some stats on the bot",
    permissions: "none"
  },
  run: async (bot, message, args) => {

    try {
      let d = new Date(bot.guilds.cache.get(message.guild.id).joinedTimestamp);

      const botembed = new EmbedBuilder()
          .setTitle("Information")
          .setColor("#000000")
          .setThumbnail(bot.user.avatarURL())
          .addFields(
            { name: "Name" , value: bot.user.username, inline: true },
            { name: "Joined On", value: '' + d, inline: true },
            { name: "Total Servers", value: '' + bot.guilds.cache.size, inline: true}
          );

      if (message instanceof ChatInputCommandInteraction) {
        message.reply({ embeds: [botembed] });
      } else message.channel.send({ embeds: [botembed] });
    } catch (err) {
      message.reply("Unfortunately an error occurred.");
      console.error(err);
    }
  }
} 