const errors = require("../../../utils/errors"); 
const usage = require("../../../utils/usage.js"); 

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

        if(!message.member.permissions.has(["MANAGE_ROLES", "ADMINISTRATOR"])) return errors.noPerms(message, "MANAGE_ROLES");
        if(!message.guild.me.permissions.has(["MANAGE_ROLES", "ADMINISTRATOR"])) return errors.lack(message.channel, "MANAGE_ROLES");

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "addrole")] });

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
