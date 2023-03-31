const { EmbedBuilder } = require("discord.js");
const config = require("../src/loaders/reader"); //get data from botconfig file

function fullHelp(bot, command, message) {
    let inf;
    if (bot.commands.has(command) || bot.aliases.has(command)) {
        if (bot.commands.has(command)) {
            inf = bot.commands.get(command);
        } else {
            inf = bot.commands.get(bot.aliases.get(command));
        }

        var a = inf.config.aliases;
        if (inf.config.aliases == [] || inf.config.aliases == undefined) a = ["There are no aliases"];

        let data = require("../src/models/storage/prefix.json");

        var SHembed = new EmbedBuilder()
            .setColor(config.orange)
            .setAuthor({name: "Help:"})
            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription(`\n\n**Command:** ${'' + inf.config.name}\n**Description:** ${'' + inf.config.description || "No Description"}\n**Usage:** ${data[message.guild.id].prefix + inf.config.usage || "No Usage"}\n**Required permissions:** ${'' + inf.config.permissions || "Bot Owner!"}\n**Aliases:** ${''+ a.join(", ") || a}`);
        return SHembed;
    } else {
        return false;
    }
}
module.exports = {
    fullHelp
}