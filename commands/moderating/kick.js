const { RichEmbed } = require("discord.js"); //get discord repository
const errors = require("../../utils/errors.js"); //get errors file
const usage = require("../../utils/usage.js"); //get usage file
//Point of command: An easy way to kick someone from a server
//Command Syntax: kick <user> <reason> - reason is optional

module.exports = {
    config: {
        name: "kick",
        aliases: []
    },
    run: async (bot, message, args) => {
        let cmd = message.content.split(" ")[0];
        if(args[0] == "help") return usage.reasonHelp(cmd, message.channel);
        if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return errors.noPerms(message, "KICK_MEMBERS");
        if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return errors.lack(message.channel, "KICK_MEMBERS");
        //if author of command does not have required perms return with noPerms()
        //if bot not have required perms return with lack()

        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let test = kUser; //will make sense later on
        if(!kUser) return errors.cantfindUser(message.channel);
        //if specified user not found, return with cantfinduser()

        if(kUser.id === bot.user.id) return errors.botuser(message, "kick"); //if specified user = bot, return botuser()

        let kReason = args.join(" ").slice(22);
        if(!kReason) kReason = "No reason given";
        //if no reason found, default = no reason given

        if(kUser.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return errors.equalPerms(message, kUser, "KICK_MEMBERS");

        let kickEmbed = new RichEmbed() //create rich embed
            .setDescription("~Kick~")
            .setColor("#"+((1<<24)*Math.random()|0).toString(16))
            .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
            .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("Kicked In", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", kReason);

        await kUser.kick(kReason).catch(() => { //try to kick user if cannot
            return message.channel.send(":x: I am unable to kick this user, does he have higher permissions than me?");
        });
        if(!test.user) {
            return message.channel.send(kickEmbed) //if kick worked, test.user not exist, so will send embed
        } else {
            return; //if kick not work, test.user will exist so will not send embed
        }
    }
}