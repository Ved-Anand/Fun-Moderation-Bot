const { ownerid } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "reload",
        aliases: ["creload"]
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;
        if (message.author.id != ownerid) return;
        if(!args[0]) return message.channel.send("Please provide a command to reload!")
        let commandName = args[0].toLowerCase()
        try {
            delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
            bot.commands.delete(commandName);
            const pull = require(`./${commandName}.js`);
            bot.commands.set(commandName, pull);
            return message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded!`);
        } catch(e) {
            return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``)
        }
    }
}