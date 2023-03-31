const { PermissionsBitField, ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");
const errors = require("../../../utils/errors.js");
const usage = require("../../../utils/usage"); 
const { writeFileSync } = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("prefix")
        .setDescription("Change the prefix")
        .addStringOption(option => {
            return option
                .setName('prefix')
                .setDescription("The new prefix")
                .setRequired(true)
        })
        .setDMPermission(false),
    config: {
        name: "prefix",
        usage: "prefix <string>",
        description: "Change the prefix",
        permissions: "Manage Server"
    },
    run: async (bot, message, args) => {

        try {
            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return errors.noPerms(message, "Manage Server");

            let toCheck;
            (message instanceof ChatInputCommandInteraction) ? toCheck = message.options.getString("prefix") : toCheck = args[0];

            if (toCheck == null || !toCheck) return message.channel.send("No Prefix was given.");
            if (toCheck == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "prefix", message)] });
            
            if (toCheck.length > 3) return (message instanceof ChatInputCommandInteraction) ? message.reply("Prefix length is too long.") : message.channel.send("Prefix length is too long.");

            let changedPrefix = toCheck;

            let data = require("../../models/storage/prefix.json");

            let append = data;

            append[message.guild.id] = {
                prefix: changedPrefix
            };

            writeFileSync("src/models/storage/prefix.json", JSON.stringify(append));

            return (message instanceof ChatInputCommandInteraction) ? message.reply(":white_check_mark: Changed prefix to " + toCheck) : message.channel.send(":white_check_mark: Changed prefix to " + toCheck);
        } catch (err) {
            message.reply("Unfortunately an error occurred.");
            console.error(err);
        }
    }

}