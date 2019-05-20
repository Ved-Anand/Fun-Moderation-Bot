const { ownerid } = require("../../tokenfile.json");
module.exports = {
    config: {
        name: "reload",
        aliases: ["creload", "refresh", "fix"]
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;
        if (message.author.id != ownerid) return;
        if(!args[0]) return message.channel.send("Please provide a command to reload!");
        let commandName = args[0].toLowerCase();
        if(!args[1]) return message.channel.send("Please specify the directory the command is in!");
        let directory = args[1].toLowerCase();
        try {
            delete require.cache[require.resolve(`../${directory}/${commandName}.js`)] // usage !reload <name>
            bot.commands.delete(commandName);
            const pull = require(`../${directory}/${commandName}.js`);
            bot.commands.set(commandName, pull);
            return message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded!`);
        } catch(e) {
            return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\` Error: ${e.message}`);
        }
    }
}