const Discord = require("discord.js"); //get discord repo
//Point of command: Just give some basic stats on the bot
//Command Syntax: botinfo

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL; //Avatar
    let botembed = new Discord.RichEmbed() //make embed explaining
        .setDescription("Bot Information")
        .setColor("#"+((1<<24)*Math.random()|0).toString(16))   //hex color randomizer
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Created On", bot.user.createdAt);
    message.channel.send(botembed); //send embed
}
module.exports.help = {
  name:"botinfo"
}