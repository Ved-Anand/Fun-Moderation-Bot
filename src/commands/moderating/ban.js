const { EmbedBuilder, PermissionsBitField } = require("discord.js");
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

        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Ban Members");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Ban Members");
        
        let bUser;
        try {
            bUser = message.mentions.members.first() || message.guild.users.cache.get(args[0]);
        } catch (e) {return message.channel.send("Couldn't find user.");}

        if(!bUser) return errors.cantfindUser(message.channel);

        if(bUser.id === bot.user.id) return errors.botuser(message, "ban");

        let bReason = args.join(" ").slice(22);
        if(!bReason) bReason = "No reason given";

        if (bUser.roles.highest.position >= message.guild.members.me.roles.highest.position) return message.channel.send("That user has more permissions than me.");
        if (bUser.roles.highest.position >= message.member.roles.highest.position && message.author.id != message.guild.ownerId) return message.channel.send("You can't use this command on this user.");

        let banEmbed = new EmbedBuilder() 
            .setDescription("**Ban**")
            .setColor("#"+((1<<24)*Math.random()|0).toString(16))
            .addFields(
                { name: "User Banned:", value: bUser, inline: true },
                { name: "Banned By:", value: `<@${message.author.id}>`, inline: true },
                { name: "Banned At:", value: ''+message.createdAt, inline: true },
                { name: "Reason:", value: ''+bReason, inline: true } 
            )

        await message.guild.bans.create(bUser, {
            reason: bReason
        }).then(() => {
            return message.channel.send({embeds: [banEmbed] });
        })

    }
}