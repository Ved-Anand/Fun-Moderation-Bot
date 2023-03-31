const urban = require("urban");
const usage = require("../../../utils/usage.js"); 
const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("urban")
        .setDescription("Look something up on the urban dictionary")
        .addStringOption(option => {
            return option
                .setName('query')
                .setDescription("Whatever you want to look up.")
        })
        .setDMPermission(false),
    config: {
        name: "urban",
        aliases: ["define", "see", "lookup"],
        usage: "urban <thing to lookup>",
        description: "Look something up on the urban dictionary",
        permissions: "none"
    },
    run: async (bot, message, args) => {

        try {
            let targetWord;

            if (message instanceof ChatInputCommandInteraction) {
                if (message.options.getString('query') == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "urban", message)] });
                if (message.options.getString('query') == null) {
                    targetWord = urban.random();
                } else {
                    targetWord = urban(message.options.getString('query').split(' '));
                }
            }
            
            else {
                targetWord = args == "" ? urban.random() : urban(args);
                if(args[0] == "help") return message.channel.send({ embeds: [usage.fullHelp(bot, "urban", message)] });
            }

            targetWord.first(function(json) {
                if (json) {
                    var tosend = "Urban Dictionary: **" +json.word + "**\n\n" + json.definition;
                    if (json.example) {
                        tosend = tosend + "\n\n__Example__:\n" + json.example;
                    }
                    (message instanceof ChatInputCommandInteraction) ? message.reply(tosend) : message.channel.send(tosend);
                } else {
                    (message instanceof ChatInputCommandInteraction) ? message.reply("No matches found") : message.channel.send("No matches found");
                }
            });
        } catch (err) {
            message.channel.send("Unfortunately an error occurred.");
            console.error(err);
        }
    }
}