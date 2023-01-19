const { PermissionsBitField } = require("discord.js");
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

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Manage Roles");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Manage Roles");

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "mute")] });

        let mutee;
        try {
            mutee = message.mentions.members.first() || message.guild.users.cache.get(args[0]);
        } catch (e) {return message.channel.send("Couldn't find user.");}

        if(!mutee) return errors.cantfindUser(message.channel);

        if(mutee.id == bot.user.id) return errors.botuser(message, "mute");

        if (mutee.roles.highest.position >= message.guild.members.me.highest.position) return message.channel.send("That user has more permissions than me.");
        if (mutee.roles.highest.position >= message.member.roles.highest.position && message.author.id != message.guild.ownerId) return message.channel.send("You can't use this command on this user.");

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

        muterole = message.guild.roles.cache.find(r => r.name === "Muted");

        if (muterole.position >= message.guild.members.me.roles.highest.position) return message.channel.send("Please make the Muted role have less power than mine.");

        if (mutee.roles.cache.has(muterole)) return message.channel.send("User is already muted!"); 

        await mutee.roles.add(muterole); 
        return message.channel.send(`User ${mutee.user.username} has been muted! Reason: ${reason}`);
    }
}
    