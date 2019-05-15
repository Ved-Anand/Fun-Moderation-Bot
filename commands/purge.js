const Discord = require("discord.js"); //get discord repo
const errors = require("../utils/errors.js"); //get errors file
//Point of command: Delete messages from a channel fast
//Command Syntax: $purge <number of messages>

module.exports.run = async (bot, message, args) => {
    if(message.channel.type == "dm") return;
    if(!message.member.hasPermission("MANAGE_MESSAGES") || !message.guild.owner) return errors.noPerms(message, "MANAGE_MESSAGES");
    if(!message.guild.me.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return errors.lack(message.channel, "MANAGE_MESSAGES");
    //if command author not have required perms return errors no Perms function()
    //if bot not have required perms return lack function()

    if(args[0] == "help") return message.channel.send("Usage: $purge (number of messages)");
    if(isNaN(args[0])) return message.channel.send("Usage: $purge (number of messages)");
    if(args[0] > 100) return message.channel.send("Please enter a number of messages to delete less than 100 to prevent lag :)");
    if(args[0] == 0) return message.channel.send("You cannot delete 0 messages!");
    const fetched = await message.channel.fetchMessages({limit: args[0]});
    message.channel.bulkDelete(fetched).catch(() => {
        message.channel.send("**-Unfortunately an error occurred, try doing the command again, maybe the messages are over 14 days old?**");
    });
}
module.exports.help = {
    name: "purge"
}