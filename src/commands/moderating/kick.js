const { EmbedBuilder, PermissionsBitField } = require("discord.js"); 
const errors = require("../../../utils/errors.js"); 
const usage = require("../../../utils/usage.js"); 

module.exports = {
    config: {
        name: "kick",
        usage: "kick <user> <reason>",
        description: "Kick someone if they're misbehaving, not permanent unlike a ban however",
        permissions: "kick members"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "kick")] });

        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Kick Members");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Kick Members");

        let kUser;
        try {
            kUser = message.mentions.members.first() || message.guild.users.cache.get(args[0]);
        } catch (e) {return message.channel.send("Couldn't find user.");}

        if(!kUser) return errors.cantfindUser(message.channel);

        if(kUser.id === bot.user.id) return errors.botuser(message, "kick");

        let kReason = args.join(" ").slice(22);
        if(!kReason) kReason = "No reason given";

        if (kUser.roles.highest.position >= message.guild.members.me.roles.highest.position) return message.channel.send("That user has more permissions than me.");
        if (kUser.roles.highest.position >= message.member.roles.highest.position && message.author.id != message.guild.ownerId) return message.channel.send("You can't use this command on this user.");

        let kickEmbed = new EmbedBuilder()
            .setDescription("**Kick**")
            .setColor("#"+((1<<24)*Math.random()|0).toString(16))
            .addFields(
                { name: "User Kicked:", value: kUser, inline: true },
                { name: "Kicked By:", value: `<@${message.author.id}>`, inline: true },
                { name: "Kicked On:", value: ''+message.createdAt, inline: true },
                { name: "Reason:", value: ''+kReason, inline: true } 
            )

        var hasKicked = 0;
        await kUser.ban(kReason).catch(() => {
            hasKicked++;
            return message.channel.send(":x: I am unable to kick this user, does he have higher permissions than me?");
        });

        if (hasKicked == 0) return message.channel.send({embeds: [kickEmbed] });
    }
}