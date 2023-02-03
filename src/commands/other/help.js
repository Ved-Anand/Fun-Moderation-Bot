const { EmbedBuilder } = require("discord.js");
const { purple } = require("../../loaders/reader");
const gethelp = require("../../../utils/usage.js");

module.exports = {
    config: {
        name: "help",
        aliases: ["halp", "commands"],
        usage: "help",
        description: "Get some information on a specific command",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        if(args[0]) {
            let command = args[0];
            let embed = gethelp.fullHelp(bot, command, message);
            if (!embed) return message.channel.send("That command was not found.");
            return message.channel.send({ embeds: [embed] });
        } else {

            let data = require("../../models/storage/prefix.json");

            let Sembed = new EmbedBuilder()
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
            message.channel.send({ embeds: [Sembed] });
        }
    } 
}