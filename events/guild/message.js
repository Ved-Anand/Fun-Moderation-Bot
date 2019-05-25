const { prefix } = require("../../botconfig.json");

module.exports = async (bot, message) => { 
    if (message.author.bot) return;
    // if (message.channel.type === "dm" && !message.content.startsWith(`${prefix}help`)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)
}