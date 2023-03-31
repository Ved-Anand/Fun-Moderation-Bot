const { ownerid } = require("../../loaders/reader"); 
const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload a command (owner only)")
        .addStringOption(option => {
            return option
                .setName('command')
                .setDescription("To be reloaded")
                .setRequired(true)
        })
        .setDMPermission(false),
    config: {
        name: "reload",
        aliases: ["creload", "refresh", "fix"]
    },
    run: async (bot, message, args) => {

        if (message instanceof ChatInputCommandInteraction) {
            if (ownerid == null && message.user.id == message.guild.ownerId) return message.channel.send("You need to put in your ID in the ownerid flag of the botconfig file.");
            if (ownerid == null || message.user.id != ownerid) return;
        } else {
            if (ownerid == null && message.author.id == message.guild.ownerId) return message.channel.send("You need to put in your ID in the ownerid flag of the botconfig file.");
            if (ownerid == null || message.author.id != ownerid) return;
        }

        let commandName;
        if (message instanceof ChatInputCommandInteraction) {
            commandName = message.options.getString("command");
        } else {
            if(!args[0]) return message.channel.send("Please provide a command to reload!");
            commandName = args[0].toLowerCase();
        }

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
                            return (message instanceof ChatInputCommandInteraction) ? message.reply("That command was not found!") : message.channel.send("That command was not found!");
                        }
                    }
                }
            }
        }
        
        bot.commands.delete(commandName);
        const pull = require(`../${directory}/${commandName}.js`);
        bot.commands.set(commandName, pull);

        return (message instanceof ChatInputCommandInteraction) ? message.reply(`The command \`${commandName.toUpperCase()}\` has been reloaded!`) : message.channel.send(`The command \`${commandName.toUpperCase()}\` has been reloaded!`);
    }
}