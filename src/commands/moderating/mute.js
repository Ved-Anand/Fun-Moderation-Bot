const errors = require("../../../utils/errors.js");
const usage = require("../../../utils/usage.js");

module.exports = {
    config: {
        name: "mute",
        aliases: ["nospeak"],
        usage: "mute <user> <reason>",
        description: "Stop someone from talking if they're spamming, etc.",
        permissions: "manage roles"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;

        if(!message.member.permissions.has("MANAGE_ROLES") && !message.member.permissions.has("ADMINISTRATOR")) return errors.noPerms(message, "MANAGE_ROLES");
        if (!message.guild.me.permissions.has("MANAGE_ROLES") && !message.guild.me.permissions.has("ADMINISTRATOR")) return errors.lack(message.channel, "MANAGE_ROLES");

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "mute")] });

        let mutee;
        try {
            mutee = message.mentions.members.first() || message.guild.users.cache.get(args[0]);
        } catch (e) {return message.channel.send("Couldn't find user.");}

        if(!mutee) return errors.cantfindUser(message.channel);

        if(mutee.id == bot.user.id) return errors.botuser(message, "mute");

        if (mutee.permissions.has("MANAGE_ROLES") || mutee.permissions.has("ADMINISTRATOR")) return errors.equalPerms(message, mutee, "MANAGE_ROLES");

        let reason = args.join(" ").slice(22);
        if(!reason) reason = "No reason was given!";

        let muterole = message.guild.roles.cache.find(r => r.name === "Muted") 

        if(!muterole) { // make a mute role 
            try{
                muterole = await message.guild.roles.create({
                    name: "Muted",
                    color: "#514f48"
                });
                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.permissionOverwrites.create(muterole, { SEND_MESSAGES: false, ADD_REACTIONS: false});
                });
            } catch(e) {
                console.log(e);
                return message.channel.send("Couldn't make a mute role. Aborting.");
            }
        }

        muterole = message.guild.roles.cache.find(r => r.name === "Muted")

        if (mutee.roles.cache.has(muterole)) return message.channel.send("User is already muted!"); 

        await mutee.roles.add(muterole); 
        return message.channel.send(`User ${mutee.user.username} has been muted! Reason: ${reason}`);
    }
}
    