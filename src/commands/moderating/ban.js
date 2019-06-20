const { RichEmbed } = require("discord.js");
const errors = require("../../../utils/errors"); //better errors
const usage = require("../../../utils/usage"); //better helpmessages 
const second = require("../../../utils/othererrors.js"); //better errors
const { prefix } = require("../../loaders/reader") //get prefix from botconfig

module.exports = {
    config: {
        name: "ban",
        aliases: ["banish", "remove"],
        usage: "$ban <user> <reason>",
        description: "Ban someone permanently from the server if they really misbehave.",
        permissions: "ban members"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");

        if(!message.member.hasPermission("BAN_MEMBERS") || !message.guild.owner) return errors.noPerms(message, "BAN_MEMBERS");
        if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return errors.lack(message.channel, "BAN_MEMBERS");

        let cmd = message.content.split(" ")[0].replace(prefix, ''); //used because command aliases
        if (args[0] == "help") return message.channel.send(usage.fullHelp(bot, cmd));

        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return errors.cantfindUser(message.channel);

        if(bUser.id === bot.user.id) return errors.botuser(message, "ban"); //if bot return with function botUser()

        let bReason = args.join(" ").slice(22);
        if(!bReason) bReason = 'No reason given';

        if(bUser.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return errors.equalPerms(message, bUser, "BAN_MEMBERS");

        let banEmbed = new RichEmbed() //create rich embed
            .setDescription("~Ban~")
            .setColor("#bc0000")
            .addField("Banned user", `${bUser} with ID ${bUser.id}`)
            .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("Banned In", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", bReason);
        try {
            bUser.ban(bReason);
            message.channel.send(banEmbed);
        } catch(e) {
            let id = second.getError(e.message);
            message.channel.send(`Unfortunately, an error occurred. Error ID: ${id}`);
        }
    }
}