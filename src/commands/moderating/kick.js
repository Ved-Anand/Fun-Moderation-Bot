const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js"); 
const errors = require("../../../utils/errors.js"); 
const usage = require("../../../utils/usage.js"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription("Kick someone if they're misbehaving.")
        .addUserOption(option => {
            return option
                .setName('user')
                .setDescription("The user to be kicked")
                .setRequired(true)
        }).addStringOption(option => {
            return option
                .setName('reason')
                .setDescription("Optional - Is there a reason you're kicking this person?")
        })
        .setDMPermission(false),
    config: {
        name: "kick",
        usage: "kick <user> <reason>",
        description: "Kick someone if they're misbehaving, not permanent unlike a ban however",
        permissions: "kick members"
    },
    run: async (bot, message, args) => {

        if (!(message instanceof ChatInputCommandInteraction) && args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "kick", message)] });

        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Kick Members");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Kick Members");

        let kUser;
        try {
            if (message instanceof ChatInputCommandInteraction) {
                kUser = message.options.getUser("user");
                kUser = message.guild.members.cache.get(kUser.id);
            } else kUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        } catch (e) {return message.reply("Couldn't find user.");}

        if (!kUser) return errors.cantfindUser(message.channel);

        if (kUser.id === bot.user.id) return errors.botuser(message, "kick");

        let kReason = (message instanceof ChatInputCommandInteraction) ? message.options.getString('reason') : args.join(" ").slice(22);
        if (!kReason || kReason == '') kReason = "No reason given";

        let authorid = (message instanceof ChatInputCommandInteraction) ? message.user.id : message.author.id;

        if (kUser.roles.highest.position >= message.guild.members.me.roles.highest.position || kUser.id == message.guild.ownerId) return message.reply("That user has more permissions than me.");
        if (kUser.roles.highest.position >= message.member.roles.highest.position && authorid != message.guild.ownerId) return message.reply("You can't use this command on this user.");
        
        let kickEmbed = new EmbedBuilder()
            .setDescription("**Kick**")
            .setColor("#"+((1<<24)*Math.random()|0).toString(16))
            .addFields(
                { name: "User Kicked:", value: kUser.displayName, inline: true },
                { name: "Kicked By:", value: `<@${authorid}>`, inline: true },
                { name: "Kicked On:", value: ''+message.createdAt, inline: true },
                { name: "Reason:", value: ''+kReason, inline: true } 
            )

        var hasKicked = 0;
        await kUser.kick(kReason).catch(() => {
            hasKicked++;
            return message.reply(":x: I am unable to kick this user, does he have higher permissions than me?");
        });

        if (hasKicked == 0) return (message instanceof ChatInputCommandInteraction) ? message.reply({embeds: [kickEmbed] }) : message.channel.send({embeds: [kickEmbed] });
    }
}