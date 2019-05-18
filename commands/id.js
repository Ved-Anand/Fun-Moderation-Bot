const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if (message.channel.type == "dm") return;
    let ided = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!ided) return message.channel.send("User not found.");
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return;
    return message.channel.send(ided.id);
}
module.exports.help = {
    name: "id"
}