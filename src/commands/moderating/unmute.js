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

        if(!message.member.permissions.has("MANAGE_ROLES") && !message.member.permissions.has("ADMINISTRATOR")) return errors.noPerms(message, "MANAGE_ROLES");
        if (!message.guild.me.permissions.has("MANAGE_ROLES") && !message.guild.me.permissions.has("ADMINISTRATOR")) return errors.lack(message.channel, "MANAGE_ROLES");

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "unmute")] });

        let mutee;
        try {
            mutee = message.mentions.members.first() || message.guild.users.cache.get(args[0]);
        } catch (e) {
            return errors.cantfindUser(message.channel);
        }

        if(!mutee) return errors.cantfindUser(message.channel); //this might be unneccessary im not sure 

        let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
        if(!muterole) return message.channel.send("There is no mute role to remove. Mute someone first to create the role.");

        if(!mutee.roles.cache.has(muterole)) return message.channel.send("That user is not muted."); 

        mutee.roles.remove(muterole);
        return message.channel.send(`User ${mutee.user.username} was unmuted.`);
    }
}
