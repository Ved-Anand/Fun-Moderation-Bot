const { PermissionsBitField, SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const errors = require("../../../utils/errors.js"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nick')
        .setDescription("Change someone's nickname.")
        .addUserOption(option => {
            return option
                .setName('user')
                .setDescription("The user whose name you wish to change.")
                .setRequired(true)
        }).addStringOption(option => {
            return option
                .setName('nickname')
                .setDescription("The nickname desired.")
                .setRequired(true)
                .setMaxLength(32)
        })
        .setDMPermission(false),
    config: {
        name: "nick",
        usage: "nick <user> <nick-name>",
        description: "Change someone's nickname",
        permissions: "change nicknames",
        aliases: ["nickname"]
    },
    run: async (bot, message, args) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageNicknames) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Manage Nicknames");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageNicknames) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Manage Nicknames");

        if (!(message instanceof ChatInputCommandInteraction) && args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "nick", message)] });

        let nUser;
        try {
            if (message instanceof ChatInputCommandInteraction) {
                nUser = message.options.getUser("user");
                nUser = message.guild.members.cache.get(nUser.id);
            } else nUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        } catch (e) {return message.channel.send("Couldn't find user.");}

        let prevName = nUser.user.username; //user's previous name before they get nicked

        if (nUser.id == bot.user.id) return errors.botuser(message, "nick");

        let authorid = (message instanceof ChatInputCommandInteraction) ? message.user.id : message.author.id;

        if (nUser.roles.highest.position >= message.guild.members.me.roles.highest.position || nUser.id == message.guild.ownerId) return message.channel.send("That user has more permissions than me.");
        if (nUser.roles.highest.position >= message.member.roles.highest.position && authorid != message.guild.ownerId) return message.channel.send("You can't use this command on this user.");

        let nickname = (message instanceof ChatInputCommandInteraction) ? message.options.getString("nickname") : args.join(" ").slice(22);
        if (!nickname || nickname == '') return message.reply("No nickname was given.");
        if (nickname.length > 32) return message.reply("Nickname is too long.");

        try {
            await nUser.setNickname(nickname);
            return (message instanceof ChatInputCommandInteraction) ? message.reply(`Changed ${prevName}'s name to ${nickname}.`) : message.channel.send(`Changed ${prevName}'s name to ${nickname}.`);
        } catch(e) {
            console.log(e);
            return (message instanceof ChatInputCommandInteraction) ? message.reply(":x: Couldn't change nickname. Sorry!") : message.channel.send(":x: Couldn't change nickname. Sorry!");
        }
    }
}