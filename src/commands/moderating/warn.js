const errors = require("../../../utils/errors.js"); //better errors

module.exports = {
    config: {
        name: "warn",
        usage: "$warn <user> <reason>",
        description: "Somebody misbehaving? Try warning them",
        permissions: "administrator"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");
        if (!message.member.hasPermission("ADMINISTRATOR")) return errors.noPerms(message, "ADMINISTRATOR");
        
        let cmd = message.content.split(" ")[0]; //because command aliases
        if (args[0] == "help") return message.channel.send(`Usage: ${cmd} <user> <reason>`);

        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!mutee) return message.channel.send("User not found.");

        if (mutee.id === bot.user.id) return errors.botuser(message, "warn");

        let reason = args.join(" ").slice(22);
        if (!reason) reason = "No reason was given."
        
        mutee.send(`You were warned in ${message.guild.name} for ${reason}`).catch(() => {
            return message.channel.send(":x: That user has their dm's blocked");
        });
        return message.channel.send(`${mutee} ***has been warned!***`);

    }
}