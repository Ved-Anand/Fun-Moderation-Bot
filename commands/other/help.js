const { RichEmbed } = require("discord.js");
const config = require("../../botconfig.json");
module.exports = {
    config: {
        name: "help",
        aliases: ["halp", "commands"]    
    },
    run: async (bot, message, args) => {
        if (!args[0]) {
            let toSend = ['```xl', 'Moderating', 'Games', 'Other', '```'];
            message.channel.send("**Please Search a module by doing $help <module-name>. The modules are as follow, below.**");
            return message.channel.send(toSend.join("\n"));
        } else {
            if (args[0].toLowerCase() != "moderating" && args[0].toLowerCase() != "other" && args[0].toLowerCase() != "games") return message.channel.send("That module was not found!");
            if (args[0].toLowerCase() === "moderating") {
                let toSend = ['```xl', '$addrole: "Add a role to someone"', '$ban: "Ban someone from the guild"', '$kick: "Kick someone from the guild"', '$mute: "Stop someone from talking"', '$purge: "Delete some messages from a channel fast"', '$removerole: "Remove a role from someone"', '$unmute: "Unmute someone whos already muted"', '$warn: "Warn someone if theyre doing something bad"', '```'];
                return message.channel.send(toSend.join("\n"));
            } 
            if (args[0].toLowerCase() === "other") {
                let toSend = ['```xl', '$botinfo: "Get some info on the bot"', '$calc: "Calculate a mathematical problem"', '$help: "Displays this message"', '$ping: "Gets the bots ping"', '$serverinfo: "Gets some info on the server"', '$urban: "Look up something on the urban dictionary"', '```'];
                return message.channel.send(toSend.join("\n"));
            }
            if (args[0].toLowerCase() === "games") {
                let toSend = ['```xl', '$8ball: "Get a cheesy answer to a question"', '```'];
                return message.channel.send(toSend.join("\n"));
            }
        }
    }
}