const { EmbedBuilder, SlashCommandBuilder, ChatInputCommandInteraction, DMChannel } = require("discord.js");
const { purple } = require("../../loaders/reader");
const gethelp = require("../../../utils/usage.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Get some information on a specific command")
        .addStringOption(option => {
            return option
                .setName('command')
                .setDescription("Optional: Get help on a specific command")
                // to do later: .addChoices
        }),
    config: {
        name: "help",
        aliases: ["halp", "commands"],
        usage: "help <command?>",
        description: "Get some information on a specific command",
        permissions: "none"
    },
    run: async (bot, message, args) => {

        try {
            let workWanted = false;

            if (message instanceof ChatInputCommandInteraction) {
                message.options.getString('command') == null ? workWanted = false : workWanted = true;
                if (message.channel instanceof DMChannel) workWanted = false; // no specific command lookup in dms. 
            } else if (args[0]) {
                workWanted = true;
            } else {
                workWanted = false;
            }

            if (workWanted) {

                let command = typeof message.options === 'undefined' ? args[0] : message.options.getString('command');

                let embed = gethelp.fullHelp(bot, command, message);
                if (!embed) return message.reply("That command was not found.");

                if (message instanceof ChatInputCommandInteraction) {
                    return message.reply({ embeds: [embed] });
                } else return message.channel.send({ embeds: [embed] });
            } else {

                let data = require("../../models/storage/prefix.json");

                let Sembed;

                if (message.channel instanceof DMChannel) {

                    Sembed = new EmbedBuilder()
                        .setColor(purple)
                        .setAuthor({
                            name: "Help:"
                        })
                        .setThumbnail(bot.user.avatarURL()) 
                        .setTimestamp()
                        .setDescription("Hello! The following commands are listed here for your convenience, but will only work in a server:")
                        .addFields({
                            name: `Commands:`, value: "``8ball`` ``dog`` ``addrole`` ``ban`` ``kick`` ``mute`` ``purge`` ``removerole`` ``unmute`` ``warn`` ``botinfo`` ``helpmsg`` ``help`` ``ping`` ``serverinfo`` ``urban``", inline: true});

                } else {

                    Sembed = new EmbedBuilder()
                        .setColor(purple)
                        .setAuthor({
                            name: "Help:"
                        })
                        .setThumbnail(bot.user.avatarURL()) 
                        .setTimestamp()
                        .setDescription(`The bot prefix is ${data[message.guild.id].prefix} \n To get more info on a specific command, type ${data[message.guild.id].prefix}help command name \n Note: Most of these commands will only work in a server. \n These are the bot's commands: `)
                        //Automate below commands later to just iterate through most folders
                        .addFields({
                            name: `Commands:`, value: "``8ball`` ``dog`` ``addrole`` ``ban`` ``kick`` ``mute`` ``purge`` ``removerole`` ``unmute`` ``warn`` ``botinfo`` ``helpmsg`` ``help`` ``ping`` ``serverinfo`` ``urban``", inline: true});

                }
                if (message instanceof ChatInputCommandInteraction) {
                    message.reply({ embeds: [Sembed] })
                } else message.channel.send({ embeds: [Sembed] });
            }
        } catch (err) {
            message.reply("Unfortunately an error occurred.");
            console.error(err);
        }
    } 
}