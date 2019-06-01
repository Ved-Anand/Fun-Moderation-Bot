const { RichEmbed } = require("discord.js");
const botconfig = require("../../botconfig.json");
const prefix = botconfig.prefix;
module.exports = {
    config: {
        name: "help",
        aliases: ["halp", "commands"],
        usage: "$help",
        description: "Get some information on a specific command",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        if(args[0]) {
            let command = args[0];
            if(bot.commands.has(command) && command != "shutdown" && command != "reload" && command != "id" && command != "eval") {
                command = bot.commands.get(command);
                var SHembed = new RichEmbed()
                    .setColor(botconfig.orange)
                    .setAuthor(`Command Help:`)
                    .setThumbnail(bot.user.displayAvatarURL)
                    .setDescription(`\n\n**Command:** ${command.config.name}\n**Description:** ${command.config.description || "No Description"}\n**Usage:** ${command.config.usage || "No Usage"}\n**Required permissions:** ${command.config.permissions || "Members"}\n**Aliases:** ${command.config.aliases || "No aliases"}`);
                message.channel.send(SHembed);
            } else {
                return message.channel.send("That command was not found, do $help to get a list of the commands");
            }
        } else {
            let Sembed = new RichEmbed()
                .setColor(botconfig.purple)
                .setAuthor(`Help:`)
                .setThumbnail(bot.user.displayAvatarURL)
                .setTimestamp()
                .setDescription(`The bot prefix is ${prefix} \n To get more info on a specific command, type $help command name \n Note: Most of these commands will only work in a server. \n These are the bot's commands: `)
                .addField(`Commands:`, "``8ball`` ``cat`` ``dog`` ``meme`` ``addrole`` ``ban`` ``kick`` ``mute`` ``purge`` ``removerole`` ``unmute`` ``warn`` ``botinfo`` ``calc`` ``help`` ``ping`` ``serverinfo`` ``urban``");
            message.author.send(Sembed);
        }
    } 
}