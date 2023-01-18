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
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.permissions.has("MANAGE_GUILD")) return errors.noPerms(message, "ADMINISTRATOR");

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "warn")] });

        let warnee;
        try {
            warnee = message.mentions.members.first() || message.guild.members.get(args[0]);
        } catch (err) { return message.channel.send("Couldn't find user to warn.")};

        if (!warnee) return message.channel.send("User not found.");

        if (warnee.permissions.has("ADMINISTRATOR")) return errors.equalPerms(message, warnee, "Administrator");

        if (warnee.id === bot.user.id) return errors.botuser(message, "warn");

        let reason = args.join(" ").slice(22);
        if (!reason) reason = "No reason was given."
        
        warnee.send(`You were warned in ${message.guild.name} for ${reason}`).catch(() => {
            return message.channel.send(":x: That user has their dm's blocked");
        });
        return message.channel.send(`:hammer: User ${warnee} **has been warned.**`);

    }
}