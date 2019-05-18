const Discord = require("discord.js");
const errors = require("../utils/errors.js");
module.exports.run = async (bot, message, args) => {
    if (message.channel.type == "dm") return;
    if (!message.member.hasPermission("CHANGE_NICKNAME")) return errors.noPerms(message, "CHANGE_NICKNAMES");
    if (message.member.nickname != "AFK") return message.channel.send("You are not afk to begin with!");
    if (args[0] == "help") return message.channel.send("Command Syntax: $unafk <nick-name>");
    let nick = args.slice(0).join(" ");   
    if (!nick) return message.channel.send("Usage: $unafk <nick-name>");
    message.guild.members.get(message.author.id).setNickname(nick).catch(() => {
        return message.channel.send("Unfortunately, an error occurred.");
    });
    message.channel.send(`${message.author} is no longer afk!`);  
}
module.exports.config = {
    name: "unafk",
    aliases: []
}