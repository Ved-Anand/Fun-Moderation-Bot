const { PermissionsBitField, SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
const errors = require("../../../utils/errors.js");
const usage = require("../../../utils/usage.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription("Mute someone if they're misbehaving.")
        .addUserOption(option => {
            return option
                .setName('user')
                .setDescription("The user to be muted.")
                .setRequired(true)
        }).addStringOption(option => {
            return option
                .setName('reason')
                .setDescription("Optional - Is there a reason you're muting this person?")
        })
        .setDMPermission(false),
    config: {
        name: "mute",
        aliases: ["nospeak"],
        usage: "mute <user> <reason>",
        description: "Stop someone from talking if they're spamming, etc.",
        permissions: "manage roles"
    },
    run: async (bot, message, args) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.noPerms(message, "Manage Roles");
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles) && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return errors.lack(message.channel, "Manage Roles");

        if (!(message instanceof ChatInputCommandInteraction) && args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "mute", message)] });

        let mutee;
        try {
            if (message instanceof ChatInputCommandInteraction) {
                mutee = message.options.getUser("user");
                mutee = message.guild.members.cache.get(mutee.id);
            } else mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        } catch (e) {return message.reply("Couldn't find user.");}

        if(!mutee) return errors.cantfindUser(message.channel);

        if(mutee.id == bot.user.id) return errors.botuser(message, "mute");

        let authorid = (message instanceof ChatInputCommandInteraction) ? message.user.id : message.author.id;

        if (mutee.roles.highest.position >= message.guild.members.me.roles.highest.position || mutee.id == message.guild.ownerId) return message.reply("That user has more permissions than me.");
        if (mutee.roles.highest.position >= message.member.roles.highest.position && authorid != message.guild.ownerId) return message.reply("You can't use this command on this user.");

        let reason = (message instanceof ChatInputCommandInteraction) ? message.options.getString('reason') : args.join(" ").slice(22);
        if(!reason || reason == '') reason = "No reason given";

        let muterole = message.guild.roles.cache.find(r => r.name === "Muted") 

        if(!muterole) { // make a mute role 
            try{
                let muterole = await message.guild.roles.create({
                    name: "Muted",
                    color: "#514f48"
                });

                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.permissionOverwrites.create(muterole, { SendMessages: false, AddReactions: false });
                });
                
            } catch(e) {
                console.log(e);
                return message.reply("Couldn't make a mute role. Aborting.");
            }
        }

        muterole = message.guild.roles.cache.find(r => r.name === "Muted");

        if (muterole.position >= message.guild.members.me.roles.highest.position) return message.channel.send("Please make the Muted role have less power than mine.");

        if (mutee.roles.cache.has(muterole)) return message.channel.send("User is already muted!"); 

        await mutee.roles.add(muterole); 
        // return message.channel.send(`User ${mutee.user.username} has been muted! Reason: ${reason}`);
        return (message instanceof ChatInputCommandInteraction) ? message.reply(`User ${mutee.user.username} has been muted! Reason: ${reason}`) : message.channel.send(`User ${mutee.user.username} has been muted! Reason: ${reason}`);
    }
}
    