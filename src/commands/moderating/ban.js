const { MessageEmbed } = require("discord.js");
const errors = require("../../../utils/errors");
const usage = require("../../../utils/usage"); 

module.exports = {
    config: {
        name: "ban",
        aliases: ["banish", "remove"],
        usage: "ban <user> <reason>",
        description: "Ban someone permanently from the server if they really misbehave.",
        permissions: "ban members"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "ban")] });

        if(!message.member.permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"])) return errors.noPerms(message, "Ban Members");
        if(!message.guild.me.permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"])) return errors.lack(message.channel, "Ban Members");
        
        let bUser;
        try {
            bUser = message.mentions.members.first() || message.guild.users.cache.get(args[0]);
        } catch (e) {return message.channel.send("Couldn't find user.");}

        if(!bUser) return errors.cantfindUser(message.channel);

        if(bUser.id === bot.user.id) return errors.botuser(message, "ban");

        let bReason = args.join(" ").slice(22);
        if(!bReason) bReason = "No reason given";

        if (bUser.permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"])) return errors.equalPerms(message, bUser, "Ban Members");

        let banEmbed = new MessageEmbed() 
            .setDescription("**Ban**")
            .setColor("#"+((1<<24)*Math.random()|0).toString(16))
            .addField("User Banned:", `${bUser}`)
            .addField("Banned By:", `<@${message.author.id}>`)
            .addField("Banned At:", ''+message.createdAt)
            .addField("Reason:", ''+bReason);

        await message.guild.bans.create(bUser, {
            reason: bReason
        }).then(() => {
            return message.channel.send({embeds: [banEmbed] });
        })

    }
}