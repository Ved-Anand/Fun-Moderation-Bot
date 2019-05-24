const Discord = require("discord.js");
let config = require("../botconfig.json");
module.exports.reasonHelp = (command, channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Command Syntax:")
        .setDescription("$" + command + " (user) <reason>  Note: Reason is optional, not needed")
        .setColor(config.purple);
    channel.send(embed).then(m => m.delete(4000));
}
module.exports.noReasonHelp = (command, channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Command Syntax:")
        .setDescription("$" + command + " (user)")
        .setColor(config.purple);
    channel.send(embed).then(m => m.delete(4000));
}
module.exports.detailedHelp = (path, channel, point, syntax) => {
    let pull = require(`../commands/${path}.js`);
    let gud;
    if (pull.config.aliases == "" || !pull.config.aliases) {gud = "This command has no aliases"} else gud = pull.config.aliases;
    let msg = ['```xl', `Point of Command: ${point}`, `Command Syntax: "${syntax}"`, `Aliases: ${gud}`, '```'];
    channel.send(msg.join("\n"));
}