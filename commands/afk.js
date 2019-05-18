const Discord = require("discord.js");
const errors = require("../utils/errors.js");
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("CHANGE_NICKNAME")) return errors.noPerms(message, "CHANGE_NICKNAMES");
    if (message.member.nickname === "AFK") return message.channel.send("You are already AFK!");
    message.channel.send(`${message.author} is now afk!`);
    message.guild.members.get(message.author.id).setNickname("AFK").catch(() => {
        return message.channel.send("Unfortunately, an error occurred.");
    });
}
module.exports.help = {
    name: "afk"
}