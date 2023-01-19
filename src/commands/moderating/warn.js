const { PermissionsBitField } = require("discord.js");
const errors = require("../../../utils/errors.js");
const usage = require("../../../utils/usage"); 

module.exports = {
    config: {
        name: "warn",
        usage: "warn <user> <reason>",
        description: "Somebody misbehaving? Try warning them",
        permissions: "administrator"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return errors.noPerms(message, "Manage Server");

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "warn")] });

        let warnee;
        try {
            warnee = message.mentions.members.first() || message.guild.members.get(args[0]);
        } catch (err) { return message.channel.send("Couldn't find user to warn.")};

        if (!warnee) return message.channel.send("User not found.");

        if (warnee.roles.highest.position >= message.guild.members.me.highest.position) return message.channel.send("That user has more permissions than me.");
        if (warnee.roles.highest.position >= message.member.roles.highest.position && message.author.id != message.guild.ownerId) return message.channel.send("You can't use this command on this user.");
        
        if (warnee.id === bot.user.id) return errors.botuser(message, "warn");

        let reason = args.join(" ").slice(22);
        if (!reason) reason = "No reason was given."
        
        warnee.send(`You were warned in ${message.guild.name} for ${reason}`).catch(() => {
            return message.channel.send(":x: That user has their dm's blocked");
        });
        return message.channel.send(`:hammer: User ${warnee} **has been warned.**`);

    }
}