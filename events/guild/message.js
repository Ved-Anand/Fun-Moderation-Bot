const config = require("../../src/loaders/reader");
let cdseconds = new Set();
module.exports = async (bot, message) => { 
    if (message.author.bot && message.author.id != bot.user.id) return;
    let prefix = config.prefix;
    let ownerid = config.ownerid;
    if(!message.content.startsWith(prefix)) return;
    if (config.privateID) {
        if (message.channel.type == "dm" || message.guild.id != config.privateID) return;
    }
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    if (cdseconds.has(message.author.id)) {
        return message.channel.send("Chill bruh");
    } else if (message.author.id != ownerid) { //bypass the command cooldown if you're the bot owner.
        cdseconds.add(message.author.id)
        setTimeout(() => {
            cdseconds.delete(message.author.id);
        }, 3500);
    }
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)
}