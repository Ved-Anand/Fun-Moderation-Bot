const { RichEmbed } = require("discord.js"); 
const errors = require("../../../utils/errors.js"); //better errors
const usage = require("../../../utils/usage.js"); //better help-messages
const { prefix } = require("../../loaders/reader") //get prefix from botconfig

module.exports = {
    config: {
        name: "kick",
        usage: "$kick <user> <reason>",
        description: "Kick someone if they're misbehaving, not permanent unlike a ban however",
        permissions: "kick members"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");

        let cmd = message.content.split(" ")[0].replace(prefix, ''); //because command aliases
        if(args[0] == "help") return message.channel.send(usage.fullHelp(bot, cmd));

        if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return errors.noPerms(message, "KICK_MEMBERS");
        if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return errors.lack(message.channel, "KICK_MEMBERS");

        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return errors.cantfindUser(message.channel);

        if(kUser.id === bot.user.id) return errors.botuser(message, "kick");

        let kReason = args.join(" ").slice(22);
        if(!kReason) kReason = "No reason given";

        if(kUser.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return errors.equalPerms(message, kUser, "KICK_MEMBERS");

        let kickEmbed = new RichEmbed() //create detailed kick embed
            .setDescription("~Kick~")
            .setColor("#"+((1<<24)*Math.random()|0).toString(16))
            .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
            .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("Kicked In", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", kReason);

        await kUser.kick(kReason).catch(() => { //try to kick user if cannot catch statement
            return message.channel.send(":x: I am unable to kick this user, does he have higher permissions than me?");
        });
        return message.channel.send(kickEmbed);
    }
}