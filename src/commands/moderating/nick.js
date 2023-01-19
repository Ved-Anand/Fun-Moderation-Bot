const { PermissionsBitField } = require("discord.js");
const errors = require("../../../utils/errors.js"); 

module.exports = {
    config: {
        name: "nick",
        usage: "nick <user> <nick-name>",
        description: "Change someone's nickname",
        permissions: "change nicknames",
        aliases: ["nickname"]
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageNicknames) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Manage Nicknames");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageNicknames) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Manage Nicknames");

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "nick")] });

        let nUser;
        try {
            nUser = message.mentions.members.first() || message.guild.users.cache.get(args[0]);
        } catch (e) {return message.channel.send("Couldn't find user.");}

        let prevName = nUser.user.username; //user's previous name before they get nicked

        if (nUser.id == bot.user.id) return errors.botuser(message, "nick");

        if (nUser.roles.highest.position >= message.guild.members.me.highest.position) return message.channel.send("That user has more permissions than me.");
        if (nUser.roles.highest.position >= message.member.roles.highest.position && message.author.id != message.guild.ownerId) return message.channel.send("You can't use this command on this user.");

        let nickname = args.join(" ").slice(22);
        if (!nickname) return message.channel.send("No nickname was given.");

        try {
            nUser.setNickname(nickname);
            return message.channel.send(`Changed ${prevName}'s name to ${nickname}.`);
        } catch(e) {
            console.log(e);
            return message.channel.send(":x: Couldn't change nickname.");
        }
    }
}