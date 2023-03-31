const { PermissionsBitField, SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const errors = require("../../../utils/errors.js");
const usage = require("../../../utils/usage.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription("Unmute someone that you've muted!")
        .addUserOption(option => {
            return option
                .setName('user')
                .setDescription("The user to be unmuted.")
                .setRequired(true)
        })
        .setDMPermission(false),
    config: {
        name: "unmute",
        usage: "unmute <user>",
        description: "If you've muted someone, unmute them with this command.",
        permissions: "manage roles"
    },
    run: async (bot, message, args) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Manage Roles");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Manage Roles");

        if (!(message instanceof ChatInputCommandInteraction) && args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "unmute", message)] });

        let mutee;
        try {
            if (message instanceof ChatInputCommandInteraction) {
                mutee = message.options.getUser("user");
                mutee = message.guild.members.cache.get(mutee.id);
            } else mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        } catch (e) {
            return errors.cantfindUser(message.channel);
        }

        if (!mutee) return errors.cantfindUser(message.channel); //this might be unneccessary im not sure 

        let authorid = (message instanceof ChatInputCommandInteraction) ? message.user.id : message.author.id; //discord js why did you make this different.

        if (mutee.roles.highest.position >= message.guild.members.me.roles.highest.position || mutee.id == message.guild.ownerId) return message.channel.send("That user has more permissions than me.");
        if (mutee.roles.highest.position >= message.member.roles.highest.position && authorid != message.guild.ownerId) return message.channel.send("You can't use this command on this user.");

        let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
        if (muterole.position >= message.guild.members.me.roles.highest.position) return message.reply("Please make the Muted role have less power than mine.");
        if (!muterole) return message.reply("There is no mute role to remove. Mute someone first to create the role.");

        await mutee.roles.remove(muterole);
        return (message instanceof ChatInputCommandInteraction) ? message.reply(`User ${mutee.user.username} was unmuted.`) : message.channel.send(`User ${mutee.user.username} was unmuted.`);
    }
}
