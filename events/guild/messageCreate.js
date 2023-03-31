const config = require("../../src/loaders/reader"); 
const { writeFileSync } = require("fs");
const { DMChannel } = require("discord.js");

let cdseconds = new Set();

module.exports = async (bot, message) => { 
    if (message.author.bot) return;

    if (config.whitelist) {
        if (!config.users.includes(message.author.id)) return;
    }

    if (message.channel instanceof DMChannel && config.mail != false) {

        if (typeof config.mail != "string") {
            console.error("Config.mail switch is invalid");
            process.exit();
        }

        let guild = bot.guilds.cache.get(config.mail);
        let modmail = require("../../src/models/modmail");
        modmail.execute(bot, message, guild);
    } else {

        if (message.channel instanceof DMChannel) return;

        let data = require("../../src/models/storage/prefix.json");
        let guildID = message.guild.id;

        if (data[guildID] == undefined) {
            let append = data;
            append[guildID] = {
                    prefix: config.prefix
            };

            writeFileSync("src/models/storage/prefix.json", JSON.stringify(append));

        }

        let prefix = data[guildID].prefix;

        require("../../src/models/mailCheck")(bot, message, message.guild, prefix);

        if(!message.content.startsWith(prefix)) return;

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
}