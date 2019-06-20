const { RichEmbed } = require("discord.js");

module.exports = { 
  config: {
    name: "botinfo",
    aliases: ["binfo"],
    usage: "$botinfo",
    description: "Get some stats on the bot",
    permissions: "none"
  },
  run: async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL; //bot avatar
    let botembed = new RichEmbed()
        .setDescription("Bot Information")
        .setColor("#"+((1<<24)*Math.random()|0).toString(16))   //hex color randomizer
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Created On", bot.user.createdAt);
    message.channel.send(botembed);
  }
}