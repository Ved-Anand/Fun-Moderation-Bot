const { ownerid } = require("../../loaders/reader"); 

module.exports = {
    config: {
        name: "reload",
        aliases: ["creload", "refresh", "fix"]
    },
    run: async (bot, message, args) => {
        if (ownerid == null && message.author.id == message.guild.ownerId) return message.channel.send("You need to put in your ID in the ownerid flag of the botconfig file.");
        if (ownerid == null || message.author.id != ownerid) return;

        if(!args[0]) return message.channel.send("Please provide a command to reload!");

        let commandName = args[0].toLowerCase();

        let directory;
        try {
            delete require.cache[require.resolve(`../fun/${commandName}.js`)];
            directory = "fun";
        } catch {
            try {
                delete require.cache[require.resolve(`../moderating/${commandName}.js`)];
                directory = "moderating"
            } catch {
                try {
                    delete require.cache[require.resolve(`../other/${commandName}.js`)];
                    directory = "other"
                } catch {
                    try {
                        delete require.cache[require.resolve(`../owner/${commandName}.js`)];
                        directory = "owner"
                    } catch {
                        try {
                            delete require.cache[require.resolve(`../modmail/${commandName}.js`)];
                            directory = "modmail"
                        } catch {
                            return message.channel.send("That command was not found!");
                        }
                    }
                }
            }
        }
        
        bot.commands.delete(commandName);
        const pull = require(`../${directory}/${commandName}.js`);
        bot.commands.set(commandName, pull);
        return message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded!`);
    }
}