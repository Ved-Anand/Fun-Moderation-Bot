const { PermissionsBitField, SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const errors = require("../../../utils/errors.js");
const usage = require("../../../utils/usage.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tempmute')
        .setDescription("Temporarily mute someone if they're misbehaving.")
        .addUserOption(option => {
            return option
                .setName('user')
                .setDescription("The user to be temporarily muted.")
                .setRequired(true)
        }).addStringOption(option => {
            return option
                .setName('time')
                .setDescription("The time user should be muted for. Example inputs: 30s,10m,2h,1d")
                .setRequired(true)
        })
        .setDMPermission(false),
    config: {
        name: "tempmute",
        aliases: ["timeout"],
        usage: "tempmute <user> <time>",
        description: "Temporarily mute someone.",
        permissions: "manage roles"
    },
    run: async (bot, message, args) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Manage Roles");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Manage Roles");

        if (!(message instanceof ChatInputCommandInteraction) && args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "tempmute", message)] });

        let user;
        try {
            if (message instanceof ChatInputCommandInteraction) {
                user = message.options.getUser("user");
                user = message.guild.members.cache.get(user.id);
            } else user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        } catch (e) {return message.reply("Couldn't find user.");}

        if (user.id == bot.user.id) return errors.botuser(message, "tempmute");

        let authorid = (message instanceof ChatInputCommandInteraction) ? message.user.id : message.author.id;

        if (user.roles.highest.position >= message.guild.members.me.roles.highest.position || user.id == message.guild.ownerId) return message.reply("That user has more permissions than me.");
        if (user.roles.highest.position >= message.member.roles.highest.position && authorid != message.guild.ownerId) return message.reply("You can't use this command on this user.");

        if (user.isCommunicationDisabled()) return message.reply("User is already timed out.");

        let time = (message instanceof ChatInputCommandInteraction) ? message.options.getString("time") : args[1];
        if (!time) return message.reply("No time for the mute was given.");

        let propTime = ms(time);
        if (propTime == undefined || isNaN(Number(propTime))) return message.reply("Please enter a proper time. Example Inputs: 30s, 10m, 2h, 1d.");

        if (propTime < 1000) return message.reply("The time you entered was too short. Please enter a time of at least 1 second.");
        if (propTime >= 28*24*60*60*1000) return message.reply("Please enter a shorter time. The max temporary mute is anywhere below 28 days.");

        // now we do the tempmuting

        try {
            await user.timeout(propTime);
            return (message instanceof ChatInputCommandInteraction) ? message.reply(`${user.displayName} has been timed out for ${time}.`) : message.channel.send(`${user.displayName} has been timed out for ${time}.`);
        } catch (err) {
            console.log(err);
            return (message instanceof ChatInputCommandInteraction) ? message.reply(`I was unable to timeout ${user.displayName}. Try a shorter time?`) : message.channel.send(`I was unable to timeout ${user.displayName}. Try a shorter time?`);
        }
    }
}