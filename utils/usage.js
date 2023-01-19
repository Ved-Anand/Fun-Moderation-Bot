const { EmbedBuilder } = require("discord.js");
const config = require("../src/loaders/reader"); //get data from botconfig file

function fullHelp(bot, command) {
    let inf;
    if (bot.commands.has(command) || bot.aliases.has(command)) {
        if (bot.commands.has(command)) {
            inf = bot.commands.get(command);
        } else {
            inf = bot.commands.get(bot.aliases.get(command));
        }

        var a = inf.config.aliases;
        if (inf.config.aliases == [] || inf.config.aliases == undefined) a = "No Aliases"

        var SHembed = new EmbedBuilder()
            .setColor(config.orange)
            .setAuthor({name: "Help:"})
            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription(`\n\n**Command:** ${'' + inf.config.name}\n**Description:** ${'' + inf.config.description || "No Description"}\n**Usage:** ${'' + inf.config.usage || "No Usage"}\n**Required permissions:** ${'' + inf.config.permissions || "Bot Owner!"}\n**Aliases:** ${''+ a}`);
        return SHembed;
    } else {
        return false;
    }
}
module.exports = {
    fullHelp
}