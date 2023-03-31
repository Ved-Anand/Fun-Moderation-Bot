const { PermissionsBitField, SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const errors = require("../../../utils/errors.js");
const usage = require("../../../utils/usage"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn someone for any misbehavior.')
        .addUserOption(option => {
            return option
                .setName('user')
                .setDescription("The user to be warned.")
                .setRequired(true)
        }).addStringOption(option => {
            return option
                .setName('reason')
                .setDescription("Optional - Is there a reason you're unbanning this person?")
        })
        .setDMPermission(false),
    config: {
        name: "warn",
        usage: "warn <user> <reason?>",
        description: "Somebody misbehaving? Try warning them",
        permissions: "administrator"
    },
    run: async (bot, message, args) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return errors.noPerms(message, "Manage Server");

        if (!(message instanceof ChatInputCommandInteraction) && args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "warn", message)] });

        let warnee;
        try {
            if (message instanceof ChatInputCommandInteraction) {
                warnee = message.options.getUser("user");
                warnee = message.guild.members.cache.get(warnee.id);
            } else warnee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        } catch (err) { return message.channel.send("Couldn't find user to warn.")};

        if (!warnee) return message.channel.send("User not found.");

        let authorid = (message instanceof ChatInputCommandInteraction) ? message.user.id : message.author.id;

        if (warnee.roles.highest.position >= message.guild.members.me.roles.highest.position || warnee.id == message.guild.ownerId) return message.reply("That user has more permissions than me.");
        if (warnee.roles.highest.position >= message.member.roles.highest.position && authorid != message.guild.ownerId) return message.reply("You can't use this command on this user.");
        
        if (warnee.id === bot.user.id) return errors.botuser(message, "warn");

        let reason = (message instanceof ChatInputCommandInteraction) ? message.options.getString('reason') : args.join(" ").slice(22);
        if(!reason || reason == '') reason = "No reason given";
        
        warnee.send(`You were warned in ${message.guild.name} for ${reason}`).catch(() => {
            // error usually means that persons dms were closed so just do nothing
        });
        return (message instanceof ChatInputCommandInteraction) ? message.reply(`:hammer: User ${warnee} **has been warned.**`) : message.channel.send(`:hammer: User ${warnee} **has been warned.**`);
        
    }
}