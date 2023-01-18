const config = require("../../src/loaders/reader"); 
let cdseconds = new Set();

module.exports = async (bot, message) => { 
    if (message.author.bot && message.author.id != bot.user.id) return;

    let prefix = config.prefix;

    if(!message.content.startsWith(prefix)) return;

    if (config.private) { 
        if (message.channel.type == "dm" || message.guild.id != config.privateID) return;
    }
    if (config.whitelist) {
        if (!config.users.includes(message.author.id)) return;
    }

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) {

        if (cdseconds.has(message.author.id)) { //command cooldown
            return message.channel.send("Please slow down!");
        } else if (message.author.id != config.ownerid) { //bypass the command cooldown if you're the bot owner.
            cdseconds.add(message.author.id)
            setTimeout(() => {
                cdseconds.delete(message.author.id);
            }, 3500); //you can change this to however milliseconds you want of command cooldown.
        }

        commandfile.run(bot, message, args);
    }
}