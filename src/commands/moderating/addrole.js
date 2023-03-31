const errors = require("../../../utils/errors"); 
const usage = require("../../../utils/usage.js"); 
const { PermissionsBitField, SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Add a role to someone')
        .addUserOption(option => {
            return option
                .setName("user")
                .setDescription("The user to add a role to")
                .setRequired(true)
        }).addRoleOption(option => {
            return option
                .setName('role')
                .setDescription('The role to be added')
                .setRequired(true)
        })
        .setDMPermission(false),
    config: {
        name: "addrole",
        aliases: ["roleadd"],
        usage: "addrole <user> <role>",
        description: "Add a role to someone",
        permissions: "manage roles"
    },
    run: async (bot, message, args) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Manage Roles");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Manage Roles");

        if (!(message instanceof ChatInputCommandInteraction) && args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "addrole", message)] });

        let rMember;
        try {
            if (message instanceof ChatInputCommandInteraction) {
                rMember = message.options.getUser("user");
                rMember = message.guild.members.cache.get(rMember.id);
            } else rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        } catch (e) {return message.reply("Couldn't find user.");}

        if (!rMember) return errors.cantfindUser(message.channel);

        if (rMember.id === bot.user.id) return errors.botuser(message, "add a role to");

        let role;
        try {
            if (message instanceof ChatInputCommandInteraction) {
                role = message.options.getRole("role");
            } else role = message.guild.roles.cache.get(args[1].substring(3).replace(">", ""));
        } catch (e) {return message.reply("Couldn't find role.");}
        if (!role) return errors.noRole(message.channel);
        
        let authorid = (message instanceof ChatInputCommandInteraction) ? message.user.id : message.author.id;

        if (role.position >= message.guild.members.me.roles.highest.position) return message.reply("I can't give someone a role that has more power than mine.");
        if (((rMember.roles.highest.position >= message.member.roles.highest.position) && authorid != message.guild.ownerId) || rMember.id == message.guild.ownerId) return message.reply("You can't give a role to someone who has more permissions than you.");

        if(rMember.roles.cache.some(i => i.name === role.name)) {
            return message.reply(`:x: User ${rMember.displayName} already has that role.`)
        } else {
            try {
                rMember.roles.add(role)
                return (message instanceof ChatInputCommandInteraction) ? message.reply(`:white_check_mark: Gave ${role.name} to ${rMember.displayName}.`) : message.channel.send(`:white_check_mark: Gave ${role.name} to ${rMember.displayName}.`); 
            } catch(err) {
                console.log(err);
                return message.reply(`:x: Unfortunately an error occurred.`);
            }
        }
    }
}
