const errors = require("../../../utils/errors"); //these are better errors
const second = require("../../../utils/othererrors.js"); //these are better errors

module.exports = {
    config: {
        name: "addrole",
        aliases: ["roleadd"],
        usage: "$addrole <user>",
        description: "Add a role to someone",
        permissions: "manage roles"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");

        if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return errors.noPerms(message, "MANAGE_ROLES");
        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return errors.lack(message.channel, "MANAGE_ROLES");

        let cmd = message.content.split(" ")[0]; //used because of command aliases
        if (args[0] == "help") return message.channel.send(`Command Syntax: ${cmd} (user) <role-name>`);

        let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0]);
        if(!rMember) return errors.cantfindUser(message.channel);

        if (rMember.id === bot.user.id) return errors.botuser(message, "add a role to");

        let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first();
        if(!role) return errors.noRole(message.channel);

        if(rMember.roles.has(role.id)) {
            return message.channel.send(`**${rMember.displayName} already has that role!**`)
        } else {
            try {
                await rMember.addRole(role.id);
                message.channel.send(`**The role, ${role.name}, has been added to ${rMember.displayName}.**`); //if successful this message
            } catch(e) {
                let id = second.getError(e.message);
                message.channel.send(`Unfortunately an error occurred. Error ID: ${id}`);
            }
        }
    }
}
