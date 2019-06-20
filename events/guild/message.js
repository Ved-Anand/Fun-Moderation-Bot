const config = require("../../src/loaders/reader"); //get data from botconfig file
let cdseconds = new Set();

module.exports = async (bot, message) => { 
    if (message.author.bot && message.author.id != bot.user.id) return; //return if bot sent message

    let prefix = config.prefix;
    let ownerid = config.ownerid;

    if(!message.content.startsWith(prefix)) return;
    /*prefix is what lets the bot know whether or a not a command is probably a command, so if message does not start
    with the prefix return*/

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
            return message.channel.send("Chill bruh");
        } else if (message.author.id != ownerid) { //bypass the command cooldown if you're the bot owner.
            cdseconds.add(message.author.id)
            setTimeout(() => {
                cdseconds.delete(message.author.id);
            }, 3500); //you can change this to however milliseconds you want of command cooldown.
        }

        commandfile.run(bot, message, args);
    }
}