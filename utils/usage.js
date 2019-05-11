const Discord = require("discord.js");
let config = require("../botconfig.json");
module.exports.reasonHelp = (command, channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Command Syntax:")
        .setDescription("$" + command + " (user) <reason>  Note: Reason is optional, not needed")
        .setColor(config.purple);
    channel.send(embed).then(m => m.delete(4000));
}