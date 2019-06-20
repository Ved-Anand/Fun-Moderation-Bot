const errors = require("../../../utils/errors.js"); //better errors

module.exports = {
    config: {
        name: "nick",
        usage: "$nick <user> <nick-name>",
        description: "Change someone's nickname",
        permissions: "change nicknames",
        aliases: ["nickname"]
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;
        if (!message.member.hasPermission("MANAGE_NICKNAMES")) return errors.noPerms(message, "CHANGE_NICKNAMES");
        if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return errors.lack(message.channel, "CHANGE_NICKNAMES");

        let nUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!nUser) return errors.cantfindUser(message.channel);

        let prevName = nUser.user.username; //user's previous name before they get nicked

        if (nUser.id == bot.user.id) return errors.botuser(message, "nick");

        if (nUser.hasPermission("ADMINISTRATOR")) return errors.equalPerms(message, nUser, "ADMINISTRATOR");

        let nickname = args.join(" ").slice(22);
        if (!nickname) return message.channel.send("No nickname was given!");

        try {
            message.guild.members.get(nUser.id).setNickname(nickname);
            message.channel.send(`Changed ${prevName}'s name to ${nickname} successfully.`);
        } catch {
            message.channel.send(":x: I can't do that to that user!")
        }
    }
}