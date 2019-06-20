const { RichEmbed } = require("discord.js");
const { prefix, purple } = require("../../loaders/reader"); //get prefix/purple elements from finalConfig in reader.js
const gethelp = require("../../../utils/usage.js"); //better help-messages

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
            let embed = gethelp.fullHelp(bot, command);
            return message.channel.send(embed);
        } else {
            let Sembed = new RichEmbed()
                .setColor(purple)
                .setAuthor(`Help:`)
                .setThumbnail(bot.user.displayAvatarURL) //bot avatar
                .setTimestamp()
                .setDescription(`The bot prefix is ${prefix} \n To get more info on a specific command, type $help command name \n Note: Most of these commands will only work in a server. \n These are the bot's commands: `)
                .addField(`Commands:`, "``8ball`` ``cat`` ``dog`` ``meme`` ``addrole`` ``ban`` ``kick`` ``mute`` ``purge`` ``removerole`` ``unmute`` ``warn`` ``botinfo`` ``helpmsg`` ``help`` ``ping`` ``serverinfo`` ``urban``");
            message.author.send(Sembed);
        }
    } 
}