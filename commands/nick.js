const Discord = require("discord.js"); 
module.exports.run = async (bot, message, args) => {
    if (message.channel.type == "dm") return;
    if (!message.member.hasPermission("CHANGE_NICKNAME")) return;
    if (args[0] == "help") return message.channel.send("Usage: $nick <nickname>");
    let nick = args.slice(0).join(" ");
    if (!nick) return message.channel.send("Nickname was not found");
    message.guild.members.get(message.author.id).setNickname(nick).catch(() => {
        return message.channel.send("Command does not work on owner.");
    });
}
module.exports.config = {
    name: "nick",
    aliases: []
}