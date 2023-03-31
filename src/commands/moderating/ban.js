const { EmbedBuilder, PermissionsBitField, ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");
const errors = require("../../../utils/errors");
const usage = require("../../../utils/usage"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban someone permanently from the server if they misbehave.')
        .addUserOption(option => {
            return option
                .setName('user')
                .setDescription("The user to be banned")
                .setRequired(true)
        }).addStringOption(option => {
            return option
                .setName('reason')
                .setDescription("Optional - Is there a reason you're banning this person?")
        })
        .setDMPermission(false),
    config: {
        name: "ban",
        aliases: ["banish", "remove"],
        usage: "ban <user> <reason>",
        description: "Ban someone permanently from the server if they really misbehave.",
        permissions: "ban members"
    },
    run: async (bot, message, args) => {

        if (!(message instanceof ChatInputCommandInteraction) && args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "ban", message)] });

        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Ban Members");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Ban Members");
        
        let bUser;
        try {
            if (message instanceof ChatInputCommandInteraction) {
                bUser = message.options.getUser("user");
                bUser = message.guild.members.cache.get(bUser.id);
            } else bUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        } catch (e) {return message.reply("Couldn't find user.");}

        if (!bUser) return errors.cantfindUser(message.channel);

        if (bUser.id === bot.user.id) return errors.botuser(message, "ban");

        let bReason = (message instanceof ChatInputCommandInteraction) ? message.options.getString('reason') : args.join(" ").slice(22);
        if (!bReason || bReason == '') bReason = "No reason given";

        let authorid = (message instanceof ChatInputCommandInteraction) ? message.user.id : message.author.id;

        if (bUser.roles.highest.position >= message.guild.members.me.roles.highest.position || bUser.id == message.guild.ownerId) return message.channel.send("That user has more permissions than me.");
        if (bUser.roles.highest.position >= message.member.roles.highest.position && authorid != message.guild.ownerId) return message.channel.send("You can't use this command on this user.");

        let banEmbed = new EmbedBuilder() 
            .setDescription("**Ban**")
            .setColor("#"+((1<<24)*Math.random()|0).toString(16))
            .addFields(
                { name: "User Banned:", value: bUser.displayName, inline: true },
                { name: "Banned By:", value: `<@${authorid}>`, inline: true },
                { name: "Banned At:", value: ''+message.createdAt, inline: true },
                { name: "Reason:", value: ''+bReason, inline: true } 
            )

        await message.guild.bans.create(bUser, {
            reason: bReason
        }).then(() => {
            return (ChatInputCommandInteraction) ? message.reply({embeds: [banEmbed] }) : message.channel.send({embeds: [banEmbed] });
        })

    }
}