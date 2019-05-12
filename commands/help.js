const Discord = require("discord.js");
const config = require("../botconfig.json");
module.exports.run = async (bot, message, args) => {
    let toHelp = message.author;
    var embed = new Discord.RichEmbed()
        .setTitle("Bot Commands:")
        .setColor(config.purple)
        .setDescription("Note: In commands that want a reason, the reason is completely optional.")
        .addField("Addrole Command:", "Usage: $addrole <user> <role-name>")
        .addField("Ban Command:", "Usage: $ban <user> <reason>")
        .addField("Botinfo Command:", "Usage: $botinfo")
        .addField("Kick Command:", "Usage: $kick <user> <reason>")
        .addField("Mute Command:", "Usage: $mute <user> <reason>")
        .addField("Ping Command:", "Usage: $ping")
        .addField("Removerole Command:", "Usage: $removerole <user> <role-name>")
        .addField("Serverinfo Command:", "Usage: $serverinfo")
        .addField("Unmute Command:", "Usage: $unmute <user> <reason>")
        .setFooter("Note 2: Most of these commands will do nothing if they are not used in a server.");
    toHelp.send(embed);
    // return toHelp.send("https://discordapp.com/oauth2/authorize?client_id=566802101183971363&scope=bot&permissions=2080898303");
}
module.exports.help = {
    name: "help"
}