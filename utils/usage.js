const { RichEmbed } = require("discord.js");
const config = require("../src/loaders/reader"); //get data from botconfig file

function fullHelp(bot, command) {
    let inf;
    if (bot.commands.has(command) || bot.aliases.has(command)) {
        if (bot.commands.has(command)) {
            inf = bot.commands.get(command);
        } else {
            inf = bot.commands.get(bot.aliases.get(command));
        }
        var SHembed = new RichEmbed()
            .setColor(config.orange)
            .setAuthor(`Help:`)
            .setThumbnail(bot.user.displayAvatarURL)
            .setDescription(`\n\n**Command:** ${inf.config.name}\n**Description:** ${inf.config.description || "No Description"}\n**Usage:** ${inf.config.usage || "No Usage"}\n**Required permissions:** ${inf.config.permissions || "Bot Owner!"}\n**Aliases:** ${inf.config.aliases || "No aliases"}`);
        return SHembed;
    } else {
        return "That command was not found, do $help to get a list of the commands";
    }
}
module.exports = {
    fullHelp
}