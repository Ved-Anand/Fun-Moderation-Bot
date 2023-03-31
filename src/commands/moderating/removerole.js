const { PermissionsBitField, SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const errors = require("../../../utils/errors.js");
const usage = require("../../../utils/usage"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Remove a role to someone')
        .addUserOption(option => {
            return option
                .setName("user")
                .setDescription("The user to remove a role from.")
                .setRequired(true)
        }).addRoleOption(option => {
            return option
                .setName('role')
                .setDescription('The role to be removed.')
                .setRequired(true)
        })
        .setDMPermission(false),
    config: {
        name: "removerole",
        aliases: ["roleremove"],
        usage: "removerole <user> <role>",
        description: "Removes a role from someone",
        permissions: "Manage Roles"
    },
    run: async (bot, message, args) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Manage Roles");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Manage Roles");

        if (!(message instanceof ChatInputCommandInteraction) && args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "removerole", message)] });

        let rMember;
        try {
            if (message instanceof ChatInputCommandInteraction) {
                rMember = message.options.getUser("user");
                rMember = message.guild.members.cache.get(rMember.id);
            } else rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        } catch (e) {return message.channel.send("Couldn't find user.");}

        if(!rMember) return errors.cantfindUser(message.channel);

        if (rMember.id === bot.user.id) return errors.botuser(message, "add a role to");

        let authorid = (message instanceof ChatInputCommandInteraction) ? message.user.id : message.author.id;

        if (rMember.roles.highest.position >= message.guild.members.me.roles.highest.position || rMember.id == message.guild.ownerId) return message.channel.send("That user has more permissions than me.");
        if (rMember.roles.highest.position >= message.member.roles.highest.position && authorid != message.guild.ownerId) return message.channel.send("You can't use this command on this user.");

        let role;
        try {
            if (message instanceof ChatInputCommandInteraction) {
                role = message.options.getRole("role");
            } else role = message.guild.roles.cache.get(args[1].substring(3).replace(">", ""));
        } catch (e) {return message.reply("Couldn't find role.");}
        if(!role) return errors.noRole(message.channel);

        if (role.position >= message.guild.members.me.roles.highest.position) return message.reply("I can't remove a role that has more power than mine.");

        if(rMember.roles.cache.some(i => i.name === role.name)) {
            try {
                rMember.roles.remove(role);
                return (message instanceof ChatInputCommandInteraction) ? message.reply(`:white_check_mark: Removed ${role.name} from ${rMember.displayName}.`) : message.channel.send(`:white_check_mark: Removed ${role.name} from ${rMember.displayName}.`); 
            } catch(err) {
                console.log(err);
                return (message instanceof ChatInputCommandInteraction) ? message.reply(`:x: Unfortunately an error occurred.`) : message.channel.send(`:x: Unfortunately an error occurred.`);
            }
        } else {
            return (message instanceof ChatInputCommandInteraction) ? message.reply(`:x: User ${rMember.displayName} doesn't have that role.`) : message.channel.send(`:x: User ${rMember.displayName} doesn't have that role.`);
        }
    }
}