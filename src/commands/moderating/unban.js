const { PermissionsBitField, ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");
const errors = require("../../../utils/errors"); 
const usage = require("../../../utils/usage"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban someone who is banned.')
        .addUserOption(option => {
            return option
                .setName('user')
                .setDescription("The user to be unbanned")
                .setRequired(true)
        }).addStringOption(option => {
            return option
                .setName('reason')
                .setDescription("Optional - Is there a reason you're unbanning this person?")
        })
        .setDMPermission(false),
    config: {
        name: "unban",
        aliases: ["unbanish", "removeban", "pardon"],
        usage: "unban <user/userid> <reason>",
        description: "Unban someone from the server if you for some reason forgive them.",
        permissions: "ban members"
    },
    run: async (bot, message, args) => {

        if (!(message instanceof ChatInputCommandInteraction) && args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "unban", message)] });

        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Ban Members");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Ban Members");
        
        let ubUser = (message instanceof ChatInputCommandInteraction) ? message.options.getUser("user").id : args[0].replace("<", "").replace("@", "").replace(">", "");
       
        let ubReason = (message instanceof ChatInputCommandInteraction) ? message.options.getReason("reason") : args.join(" ").slice(22);
        if (!ubReason || ubReason == '') ubReason = "No reason given";

        try {
            await message.guild.members.unban(ubUser, {reason: ubReason} )
            .then(() => {
                return (message instanceof ChatInputCommandInteraction) ? message.reply("User was unbanned.") : message.channel.send("User was unbanned.");
            }) 
        } catch (e) {
            console.log(e);
            return (message instanceof ChatInputCommandInteraction) ? message.reply("An error occurred. User picked may be invalid or not banned.") : message.channel.send("An error occurred. User picked may be invalid or not banned.");
        }
    }
}
