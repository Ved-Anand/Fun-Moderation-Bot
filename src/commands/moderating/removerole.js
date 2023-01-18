const errors = require("../../../utils/errors.js");
const usage = require("../../../utils/usage"); 

module.exports = {
    config: {
        name: "removerole",
        aliases: ["roleremove"],
        usage: "removerole <user> <role>",
        description: "Removes a role from someone",
        permissions: "Manage Roles"
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;

        if(!message.member.permissions.has(["MANAGE_ROLES", "ADMINISTRATOR"])) return errors.noPerms(message, "MANAGE_ROLES");
        if(!message.guild.me.permissions.has(["MANAGE_ROLES", "ADMINISTRATOR"])) return errors.lack(message.channel, "MANAGE_ROLES");

        if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "removerole")] });

        let rMember;
        try {
            rMember = message.mentions.members.first() || message.guild.users.cache.get(args[0]);
        } catch (e) {return message.channel.send("Couldn't find user.");}

        if(!rMember) return errors.cantfindUser(message.channel);

        if (rMember.id === bot.user.id) return errors.botuser(message, "add a role to");

        if (rMember.permissions.has("ADMINISTRATOR")) return errors.equalPerms(message, rMember, "Administrator");

        let role;
        try {
            role = message.guild.roles.cache.get(args[1].substring(3).replace(">", ""));
        } catch (e) {return message.channel.send("Couldn't find role.");}
        if(!role) return errors.noRole(message.channel);

        if(rMember.roles.cache.some(i => i.name === role.name)) {
            try {
                rMember.roles.remove(role)
                return message.channel.send(`:white_check_mark: Removed ${role.name} from ${rMember.displayName}.`); 
            } catch(err) {
                console.log(err);
                return message.channel.send(`:x: Unfortunately an error occurred.`);
            }
        } else {
            return message.channel.send(`:x: User ${rMember.displayName} doesn't have that role.`)
        }
    }
}