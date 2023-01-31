const { PermissionsBitField } = require("discord.js");
const errors = require("../../../utils/errors.js");
const usage = require("../../../utils/usage.js");

module.exports = {
    config: {
        name: "unmute",
        usage: "unmute <user>",
        description: "If you've muted someone, unmute them with this command.",
        permissions: "manage roles"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Manage Roles");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Manage Roles");

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "unmute")] });

        let mutee;
        try {
            mutee = message.mentions.members.first() || message.guild.users.cache.get(args[0]);
        } catch (e) {
            return errors.cantfindUser(message.channel);
        }

        if(!mutee) return errors.cantfindUser(message.channel); //this might be unneccessary im not sure 

        if (mutee.roles.highest.position >= message.guild.members.me.roles.highest.position) return message.channel.send("That user has more permissions than me.");
        if (mutee.roles.highest.position >= message.member.roles.highest.position && message.author.id != message.guild.ownerId) return message.channel.send("You can't use this command on this user.");

        let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
        if (muterole.position >= message.guild.members.me.roles.highest.position) return message.channel.send("Please make the Muted role have less power than mine.");
        if(!muterole) return message.channel.send("There is no mute role to remove. Mute someone first to create the role.");

        mutee.roles.remove(muterole);
        return message.channel.send(`User ${mutee.user.username} was unmuted.`);
    }
}
