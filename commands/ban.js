const Discord = require("discord.js"); //get discord repository
const errors = require("../utils/errors.js"); //get errors file
const usage = require("../utils/usage.js");
//Point of command: An easy way to ban someone using the bot
//Command Syntax: ban <user> <reason>(OPTIONAL)

module.exports.run = async (bot, message, args) => {
    if(message.channel.type == "dm") return;
    if(!message.member.hasPermission("BAN_MEMBERS") || !message.guild.owner) return errors.noPerms(message, "BAN_MEMBERS");
    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return errors.lack(message.channel, "BAN_MEMBERS");
    //if author of command does not have required perms, return with noPerms function
    //if bot not have required perms, return with lack function
    if (args[0] == "help") return usage.reasonHelp("ban", message.channel);

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let test = bUser; //will make sense later on
    if(!bUser) return errors.cantfindUser(message.channel);
    //if specified user not found, return with function cantFindUser()

    if(bUser.id === bot.user.id) return errors.botuser(message); //if bot return with function botUser()

    let bReason = args.join(" ").slice(22);
    if(!bReason) bReason = 'No reason given';
    //if no reason found, default reason = "No reason given"

    if(bUser.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return errors.equalPerms(message, bUser, "BAN_MEMBERS");

    let banEmbed = new Discord.RichEmbed() //create rich embed
        .setDescription("~Ban~")
        .setColor("#bc0000")
        .addField("Banned user", `${bUser} with ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);

    await bUser.ban(bReason).catch(() => {  //try to ban user, if cannot 
        return message.channel.send(":x: I am unable to kick this user, does he have higher permissions than me?");
    });
    if(!test.user) {
        return message.channel.send(banEmbed) //if ban was successful test.user will not exist, so then it will send embed
    } else {
        return; //the point of this is to make sure that if user was not banned due to error, it will not send embed
    }
}
module.exports.config = {
    name: "ban",
    aliases: ["banish", "remove"]
}