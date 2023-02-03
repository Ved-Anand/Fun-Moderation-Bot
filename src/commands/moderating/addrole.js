const errors = require("../../../utils/errors"); 
const usage = require("../../../utils/usage.js"); 
const { PermissionsBitField } = require("discord.js");

module.exports = {
    config: {
        name: "addrole",
        aliases: ["roleadd"],
        usage: "addrole <user> <role>",
        description: "Add a role to someone",
        permissions: "manage roles"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Manage Roles");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Manage Roles");

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "addrole", message)] });

        let rMember;
        try {
            rMember = message.mentions.members.first() || message.guild.users.cache.get(args[0]);
        } catch (e) {return message.channel.send("Couldn't find user.");}

        if(!rMember) return errors.cantfindUser(message.channel);

        if (rMember.id === bot.user.id) return errors.botuser(message, "add a role to");

        let role;
        try {
            role = message.guild.roles.cache.get(args[1].substring(3).replace(">", ""));
        } catch (e) {return message.channel.send("Couldn't find role.");}
        if(!role) return errors.noRole(message.channel);
        
        if (role.position >= message.guild.members.me.roles.highest.position) return message.channel.send("I can't give someone a role that has more power than mine.");
        if (rMember.roles.highest.position >= message.member.roles.highest.position || rMember.id == message.guild.ownerId) return message.channel.send("You can't give a role to someone who has more permissions than you.");

        if(rMember.roles.cache.some(i => i.name === role.name)) {
            return message.channel.send(`:x: User ${rMember.displayName} already has that role.`)
        } else {
            try {
                rMember.roles.add(role)
                return message.channel.send(`:white_check_mark: Gave ${role.name} to ${rMember.displayName}.`); 
            } catch(err) {
                console.log(err);
                return message.channel.send(`:x: Unfortunately an error occurred.`);
            }
        }
    }
}
